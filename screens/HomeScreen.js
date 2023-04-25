import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import colors from "../constants/Colors";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SpinningDesk from "../components/SpinDesk";
import { useDispatch, useSelector } from "react-redux";

const HomeScreen = () => {
  const [viewableIndex, setViewableIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const videoRef = useRef();

  const dispatch = useDispatch();

  const videos = useSelector((state) => state.Videos);
  const screenIsFocused = useIsFocused();

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      if (viewableItems.length > 0) {
        let index = viewableItems[0].index;
        setViewableIndex(index);
      }
    },
    [viewableIndex]
  );
  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged, viewabilityConfig },
  ]);

  const iconTop = Dimensions.get("window").height / 2 - 20;
  const iconLeft = Dimensions.get("window").width / 2 - 20;
  const renderItem = ({ item, index, key }) => {
    return (
      <TouchableOpacity
        style={styles.videoContainer}
        key={key}
        activeOpacity={1}
        className="!bg-black"
        onPress={() => setIsPlaying(!isPlaying)}>
        <Video
          source={{ uri: item.url }}
          ref={videoRef}
          style={styles.video}
          shouldPlay={screenIsFocused && index == viewableIndex && isPlaying}
          isLooping
          resizeMode={ResizeMode.STRETCH}
        />
        {/* <View style={styles.videoInfo}></View> */}
        {!isPlaying && (
          <TouchableOpacity className="absolute ">
            <Ionicons
              name="play"
              size={40}
              color="white"
              onPress={() => setIsPlaying(true)}
              style={{
                position: "absolute",
                top: iconTop,
                left: iconLeft,
                color: "rgba(255,255,255,0.7)",
                // transform: [{ translateX: +"50%" }, { translateY: -50 }],
              }}
            />
          </TouchableOpacity>
        )}
        <View className="absolute right-5 bottom-[22%]  ">
          <TouchableOpacity className="items-center mb-3 child:shadow-sm">
            <Ionicons name="heart" color="white" size={40} />
            <Text
              style={{
                textShadowColor: "black",
                textShadowOffset: { width: -0, height: 0 },
                textShadowRadius: 4,
              }}
              className="text-white shadow-sm">
              48
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center mb-3">
            <Ionicons name="chatbubble-ellipses" color="white" size={40} />
            <Text
              style={{
                textShadowColor: "black",
                textShadowOffset: { width: -0, height: 0 },
                textShadowRadius: 4,
              }}
              className="text-white shadow-sm">
              78
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center mb-3">
            <Ionicons name="share-social" color="white" size={40} />
            <Text
              style={{
                textShadowColor: "black",
                textShadowOffset: { width: -0, height: 0 },
                textShadowRadius: 4,
              }}
              className="text-white shadow-sm">
              245
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity className="items-center mb-3">
            <SpinningDesk />
          </TouchableOpacity> */}
        </View>
        <View className="absolute bottom-[15%] flex-row justify-between  w-full pr-3 items-center">
          <Text className="text-white pl-4 text-xl">mustafa osama</Text>
          <SpinningDesk isPlaying={isPlaying} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videos.reverse()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get("screen").height}
        decelerationRate="fast"
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  videoContainer: {
    height: Dimensions.get("screen").height,
    // backgroundColor: colors.backgroundPrimary,
  },
  video: {
    flex: 1,
    backgroundColor: "black",
    opacity: 0.85,
  },
  videoInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: colors.backgroundSecondary,
  },
  username: {
    color: colors.textSecondary,
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});

export default HomeScreen;
