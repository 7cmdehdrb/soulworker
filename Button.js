import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Alert } from "react-native";

const Button = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={() => {}}
    >
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
