import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const Button = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={() => {
        console.log("open");
      }}
    >
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "90%",
    paddingVertical: 5,
    marginVertical: 3,
    borderRadius: 5,
    backgroundColor: "#fad15d",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    textShadowColor: "black",
    textShadowRadius: 2,
  },
});
