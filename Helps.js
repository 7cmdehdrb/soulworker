import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { HomeStyles, BroochButtonStyles } from "./Styles";
import Modal from "react-native-modal";

import SoulWorker from "./src/soulworker_simulator.png";
import Converter_Help from "./src/converter/converter_help.png";
import Akashic_Help from "./src/akashic/akashic_help.png";
import Brooch_Help from "./src/brooch/brooch_help.png";

function Helps(props) {
  const [modalState, setModalState] = useState(false);
  const [source, setSource] = useState(Converter_Help);
  const [directURL, setDirectURL] = useState("Converter");

  return (
    <View style={[HomeStyles.Home, { paddingVertical: 20 }]}>
      <Image
        style={[HomeStyles.Home_Head, { marginBottom: 40 }]}
        source={SoulWorker}
      ></Image>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setSource(Converter_Help);
          setDirectURL("Converter");
          setModalState(true);
        }}
        style={[
          HomeStyles.Home_Button,
          {
            backgroundColor: "#FFFEAE",
          },
        ]}
      >
        <Text style={HomeStyles.Home_Text}>컨버터 가이드</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setSource(Akashic_Help);
          setDirectURL("Akashic");
          setModalState(true);
        }}
        style={[
          HomeStyles.Home_Button,
          {
            backgroundColor: "#84E4F9",
          },
        ]}
      >
        <Text style={HomeStyles.Home_Text}>아카식 가이드</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setSource(Brooch_Help);
          setDirectURL("Brooch");
          setModalState(true);
        }}
        style={[
          HomeStyles.Home_Button,
          {
            backgroundColor: "#D6FF9A",
          },
        ]}
      >
        <Text style={HomeStyles.Home_Text}>브로치 가이드</Text>
      </TouchableOpacity>

      <View style={{ flex: 3 }}></View>

      {/* Modal Start */}

      <Modal
        style={HomeStyles.Home_Modal}
        isVisible={modalState}
        coverScreen={true}
        useNativeDriver={true}
        onBackButtonPress={() => {
          setModalState(false);
        }}
      >
        <View style={HomeStyles.Home_Help}>
          <Image
            source={source}
            style={[HomeStyles.Home_Image, { flex: 10 }]}
          ></Image>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              width: "90%",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={[BroochButtonStyles.button, { marginVertical: 10 }]}
              onPress={() => {
                setModalState(false);
              }}
            >
              <Text style={BroochButtonStyles.text}>닫기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[BroochButtonStyles.button, { marginVertical: 10 }]}
              onPress={() => {
                setModalState(false);
                props.navigation.navigate(directURL);
              }}
            >
              <Text style={BroochButtonStyles.text}>바로가기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal End */}
    </View>
  );
}

export default Helps;
