import React, { useState } from "react";
import { Animated, TouchableOpacity, View, Text } from "react-native";
import MarqueeView from "react-native-marquee-view";
import Ionicons from "react-native-vector-icons/Ionicons";

const AddMusic = ({ sound }) => {
  const [selected, setSelected] = useState(false);
  const [width] = useState(new Animated.Value(100));

  const handleExpand = async () => {
    if (selected) {
      setSelected(false);
      await sound.stopAsync();
      try {
        Animated.timing(width, {
          toValue: 100,
          duration: 300,
          useNativeDriver: false,
        }).start();
      } catch (error) {
        console.warn(error);
      }
    } else {
      setSelected(true);
      await sound.playAsync();
      try {
        Animated.timing(width, {
          toValue: 200,
          duration: 300,
          useNativeDriver: false,
        }).start();
      } catch (error) {
        console.warn(error);
      }
    }
  };
  return (
    <Animated.View style={{ width }}>
      <TouchableOpacity
        onPress={handleExpand}
        className="flex-row bg-[#222222] items-center rounded-md p-1">
        <Ionicons name="musical-note" color="white" />
        {selected ? (
          <MarqueeView
            style={{
              backgroundColor: "#222222",
            }}>
            <Text style={{ color: "white" }} className="w-full text-center">
              It's Gonna Be Alright - Basixx
            </Text>
          </MarqueeView>
        ) : (
          <Text style={{ color: "white" }} className="w-full text-center">
            add music
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AddMusic;
