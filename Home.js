import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  AntDesign,
  Feather,
} from "@expo/vector-icons";
import { resetState } from "./ConverterState";
import { HomeStyles } from "./Styles";
import SoulWorker from "./src/soulworker_simulator.png";

export default class extends React.Component {
  state = {
    modalVisible: false,
  };

  render() {
    return (
      <View style={HomeStyles.Home}>
        <Image
          style={[HomeStyles.Home_Head, { marginVertical: 10 }]}
          source={SoulWorker}
        ></Image>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            HomeStyles.Home_Button,
            {
              backgroundColor: "#FFFEAE",
            },
          ]}
          onPress={() => {
            resetState();
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
              backgroundColor: "#84E4F9",
            },
          ]}
          onPress={() => {
            this.props.navigation.navigate("Akashic");
          }}
        >
          <Text style={HomeStyles.Home_Text}>
            <MaterialCommunityIcons name="cards" size={30} color="black" />
            아카식 시뮬레이터
          </Text>
        </TouchableOpacity>

        {/*  */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            HomeStyles.Home_Button,
            {
              backgroundColor: "#dc9efc",
            },
          ]}
          onPress={() => {
            this.props.navigation.navigate("Brooch");
          }}
        >
          <Text style={HomeStyles.Home_Text}>
            <Entypo name="shield" size={30} color="black" />
            브로치 시뮬레이터
          </Text>
        </TouchableOpacity>

        {/*  */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            HomeStyles.Home_Button,
            {
              backgroundColor: "gray",
            },
          ]}
          onPress={() => {
            // this.props.navigation.navigate("Akashic");
            alert("준비중입니다...");
          }}
        >
          <Text style={HomeStyles.Home_Text}>
            <FontAwesome name="gears" size={30} color="black" />
            성순 시뮬레이터
          </Text>
        </TouchableOpacity>

        {/*  */}

        <View style={HomeStyles.Home_Settings_box}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              HomeStyles.Home_Settings_btn,
              {
                backgroundColor: "#D6FF9A",
              },
            ]}
            onPress={() => {
              this.props.navigation.navigate("Settings");
            }}
          >
            <Text style={[HomeStyles.Home_Text, { fontSize: 24 }]}>
              <Feather name="settings" size={24} color="black" />
              설정
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              HomeStyles.Home_Settings_btn,
              {
                backgroundColor: "#FFC7C7",
              },
            ]}
            onPress={() => {
              this.props.navigation.navigate("Helps");
            }}
          >
            <Text style={[HomeStyles.Home_Text, { fontSize: 24 }]}>
              <AntDesign name="questioncircleo" size={24} color="black" />
              도움말
            </Text>
          </TouchableOpacity>
        </View>

        {/*  */}

        <Text
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            marginLeft: 10,
            color: "black",
            opacity: 0.5,
          }}
        >
          Ver 1.2.1
        </Text>
      </View>
    );
  }
}
