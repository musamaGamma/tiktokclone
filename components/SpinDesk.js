import React, { useRef, useEffect } from "react";
import { Animated, Easing, Image } from "react-native";

const SpinningImage = ({ isPlaying }) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const spinAnimation = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      if (spinAnimation.current) {
        spinAnimation.current.stop();
      }

      spinAnimation.current = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );

      spinAnimation.current.start();
    } else {
      if (spinAnimation.current) {
        spinAnimation.current.stop();
      }
    }

    return () => {
      if (spinAnimation.current) {
        spinAnimation.current.stop();
      }
    };
  }, [isPlaying, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.Image
      source={{
        uri: "https://assets.stickpng.com/images/5856b3da4f6ae202fedf2794.png",
      }}
      style={{
        transform: [{ rotate: spin }],
        width: 50,
        height: 50,
      }}
    />
  );
};

export default SpinningImage;
