import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as Camera from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useDispatch } from "react-redux";
import { addVideo } from "../redux/actions/VideosActions";
import { Audio } from "expo-av";
import AddMusic from "../components/AddMusic";
// import VideoProcessing from "react-native-video-processing";

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [cameraFlash, setCameraFlash] = useState(
    Camera.Constants.FlashMode.off
  );

  const [sound, setSound] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/music.mp3")
    );
    setSound(sound);
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, []);

  useEffect(() => {
    playSound();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { status: cameraStatus } =
          await Camera.requestCameraPermissionsAsync();
        const { status: micStatus } =
          await Camera.requestMicrophonePermissionsAsync();
        const { status: gallaryStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log(cameraStatus, micStatus);
        if (cameraStatus === "granted" && micStatus === "granted")
          setHasPermission(true);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const recordVideo = async () => {
    // playSound();
    if (cameraRef) {
      try {
        const options = {
          maxDuration: 60,
          quality: Camera.Constants.VideoQuality["480"],
        };
        const videoRecordPromise = cameraRef.recordAsync(options);
        if (videoRecordPromise) {
          const data = await videoRecordPromise;
          const source = data.uri;
          let sourceThumb = await generateThumbnail(source);
          console.log({ source });

          dispatch(addVideo(source));
          navigation.navigate("Home", { source, sourceThumb });
        }
      } catch (error) {
        console.warn(error);
      }
    }
  };

  const stopVideo = async () => {
    if (cameraRef) {
      await sound.stopAsync();
      cameraRef.stopRecording();
    }
  };

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    console.log({ result });
    if (!result.canceled) {
      let sourceThumb = await generateThumbnail(result.assets[0].uri);
      navigation.navigate("savePost", {
        source: result.assets[0].uri,
        sourceThumb,
      });
    }
  };

  const generateThumbnail = async (source) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
        time: 1000,
      });

      return uri;
    } catch (e) {
      console.warn(e);
    }
  };

  const isFocused = useIsFocused();
  console.log({ isFocused });

  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera.Camera
          ref={(ref) => setCameraRef(ref)}
          style={styles.camera}
          ratio={"16:9"}
          type={cameraType}
          flashMode={cameraFlash}
          onCameraReady={() => setIsCameraReady(true)}>
          <View className="justify-center items-center mt-4">
            <AddMusic sound={sound} />
          </View>
          <View style={styles.sideBarContainer} className="">
            <TouchableOpacity
              style={styles.sideBarButton}
              onPress={() =>
                setCameraType(
                  cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                )
              }>
              {/* <Feather name="refresh-ccw" size={24} color={"white"} /> */}
              <Text style={styles.iconText}>Flip</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sideBarButton}
              onPress={() =>
                setCameraFlash(
                  cameraFlash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.torch
                    : Camera.Constants.FlashMode.off
                )
              }>
              {/* <Feather name="zap" size={24} color={"white"} /> */}
              <Text style={styles.iconText}>Flash</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomBarContainer}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.recordButtonContainer}>
              <TouchableOpacity
                disabled={!isCameraReady}
                onLongPress={() => recordVideo()}
                onPressOut={() => stopVideo()}
                style={styles.recordButton}
              />
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => pickFromGallery()}
                style={styles.galleryButton}>
                {galleryItems[0] == undefined ? (
                  <></>
                ) : (
                  <Image
                    style={styles.galleryButtonImage}
                    source={{ uri: galleryItems[0].uri }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Camera.Camera>
      )}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  camera: {
    flex: 1,
    backgroundColor: "black",
    aspectRatio: 9 / 16,
  },
  bottomBarContainer: {
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    marginBottom: 30,
  },
  recordButtonContainer: {
    flex: 1,
    marginHorizontal: 30,
  },
  recordButton: {
    borderWidth: 8,
    borderColor: "#ff404087",
    backgroundColor: "#ff4040",
    borderRadius: 100,
    height: 80,
    width: 80,
    alignSelf: "center",
  },
  galleryButton: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    width: 50,
    height: 50,
  },
  galleryButtonImage: {
    width: 50,
    height: 50,
  },
  sideBarContainer: {
    top: 60,
    right: 20,
    marginHorizontal: 20,
    position: "absolute",
  },
  iconText: {
    color: "white",
    fontSize: 15,
    marginTop: 5,
    textShadowColor: "black",
    textShadowOffset: { width: -0, height: 0 },
    textShadowRadius: 4,
  },
  sideBarButton: {
    alignItems: "center",
    marginBottom: 25,
  },
});
