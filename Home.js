import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  Ionicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { HomeStyles } from "./Styles";
import SoulWorker from "./src/soulworker.png";

export default class extends React.Component {
  state = {
    modalVisible: false,
  };

  render() {
    return (
      <View style={HomeStyles.Home}>
        <Image style={HomeStyles.Home_Head} source={SoulWorker}></Image>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            HomeStyles.Home_Button,
            {
              backgroundColor: "#FFFEAE",
            },
          ]}
          onPress={() => {
            this.props.navigation.navigate("Converter");
          }}
        >
          <Text style={HomeStyles.Home_Text}>
            <Ionicons name="options" size={30} color="black" />
            컨버터 시뮬레이터
          </Text>
        </TouchableOpacity>

        {/*  */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            HomeStyles.Home_Button,
            {
              //   backgroundColor: "#84E4F9",
              backgroundColor: "#808080",
            },
          ]}
          onPress={() => {
            alert("준비중입니다!");
          }}
        >
          <Text style={HomeStyles.Home_Text}>
            <MaterialCommunityIcons name="cards" size={30} color="black" />
            아카식 시뮬레이터
          </Text>
        </TouchableOpacity>

        {/*  */}

        <View style={HomeStyles.Home_Button}></View>
      </View>
    );
  }
}
