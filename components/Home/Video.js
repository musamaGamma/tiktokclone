import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import { Video, ResizeMode } from "expo-av";

const Video = ({ item, index, key, viewableIndex }) => {
  console.log({ index, viewableIndex });

  const videoRef = useRef(null);
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pauseAsync();
      }
    };
  }, []);
  return (
    <View style={styles.videoContainer} key={key}>
      <Video
        source={{ uri: item.url }}
        ref={videoRef}
        style={styles.video}
        shouldPlay={index == viewableIndex}
        isLooping
        resizeMode={ResizeMode.STRETCH}
      />
      <View style={styles.videoInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default Video;
