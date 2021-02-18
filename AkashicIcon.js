import React, { useState } from "react";
import { View, Image, Animated, TouchableOpacity } from "react-native";
import unloadedImage from "./src/akashic/icons/undefined.png";
import {
  cardImage5N,
  cardImage5H,
  cardImage4N,
  cardImage4H,
} from "./AkashicDB";

export function AkashicIcon(props) {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const { keyCode, value, setModalState, setModalImage } = props;
  let borderStyle;

  //   Animate Style Style

  const rotateAnimation = Animated.timing(animation, {
    toValue: 1,
    duration: 3000,
    useNativeDriver: false,
  });

  const animationStyle = {
    borderColor: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ["#ff0000", "#ffcccc", "#ff0000"],
    }),
  };

  Animated.loop(rotateAnimation, {
    iterations: 5,
  }).start();

  //   Animate Style End

  switch (value[1]) {
    case 2:
      borderStyle = [
        {
          margin: 10,
          borderWidth: 5,
          borderRadius: 5,
        },
        {
          borderColor: "#b2ea93",
        },
      ];
      break;

    case 3:
      borderStyle = [
        {
          margin: 10,
          borderWidth: 5,
          borderRadius: 5,
        },
        {
          borderColor: "#4e80d5",
        },
      ];
      break;

    case 4:
      borderStyle = [
        {
          margin: 10,
          borderWidth: 5,
          borderRadius: 5,
        },
        {
          borderColor: "#e8cf6a",
        },
      ];
      break;

    case 5:
      borderStyle = [
        {
          margin: 10,
          borderWidth: 5,
          borderRadius: 5,
        },
        {
          borderColor: "fcffca",
        },
        animationStyle,
      ];
      break;

    default:
      [
        {
          margin: 10,
          borderWidth: 5,
          borderRadius: 5,
        },
        {
          borderColor: "ff0000",
        },
        animationStyle,
      ];
      break;
  }

  return (
    <View
      style={[
        {
          flex: 1,
          margin: 5,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
      key={keyCode}
    >
      {value[1] == 5 ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setModalImage(
              value[3] ? cardImage5H[value[2]] : cardImage5N[value[2]]
            );
            setModalState(true);
          }}
        >
          <Animated.View style={borderStyle}>
            <Image
              source={value[0]}
              loadingIndicatorSource={unloadedImage}
              fadeDuration={100}
            ></Image>
          </Animated.View>
        </TouchableOpacity>
      ) : value[1] == 4 ? (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setModalImage(
              value[3] ? cardImage4H[value[2]] : cardImage4N[value[2]]
            );
            setModalState(true);
          }}
        >
          <View style={borderStyle}>
            <Image
              source={value[0]}
              loadingIndicatorSource={unloadedImage}
              fadeDuration={100}
            ></Image>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={borderStyle}>
          <Image
            source={value[0]}
            loadingIndicatorSource={unloadedImage}
            fadeDuration={100}
          ></Image>
        </View>
      )}
    </View>
  );
}
