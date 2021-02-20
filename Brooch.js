import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { BroochStyles, BroochButtonStyles, HomeStyles } from "./Styles";
import { BroochTable } from "./Table";
import { getRandomInt } from "./utils";

import * as DB from "./BroochDB";

// IMAGE

import TERA from "./src/brooch/icons/ETC_0_TeraBroachTransfer.png";
import ATK from "./src/brooch/icons/ETC_0_ATKBroachTransfer.png";
import DEF from "./src/brooch/icons/ETC_0_DEFBroachTransfer.png";
import FUN from "./src/brooch/icons/ETC_0_FunBroachTransfer.png";

import TERA_BTN from "./src/brooch/icons/TERA_BTN.png";
import ATK_BTN from "./src/brooch/icons/ATK_BTN.png";
import DEF_BTN from "./src/brooch/icons/DEF_BTN.png";
import FUN_BTN from "./src/brooch/icons/FUN_BTN.png";

import Brooch_Help from "./src/brooch/brooch_help.png";

function Brooch() {
  let defaultState = {
    TERA: 0,
    ATK: 0,
    DEF: 0,
    FUN: 0,
  };
  const [state, setState] = useState(defaultState);
  const [mode, setMode] = useState("gacha");
  const [possible, setPossible] = useState(true);
  const [list, setList] = useState([]);
  const [savedList, setSavedList] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [modalState2, setModalState2] = useState(false);
  const [modalData, setModalData] = useState({
    brooch: 0,
    rank: "mega",
    theme: "SD",
    type: "ATK",
  });

  function getBrooch(type) {
    let brooch = 0;
    let broochID = 0;
    let theme = "SD";
    let rank = "mega";
    const rankTemp = getRandomInt(1, 100);

    if (type == "TERA") {
      // 통테큐 일 경우
      const themeTemp = getRandomInt(1, 4);
      rank = "tera";

      if (themeTemp == 1) {
        theme = "SD";
      } else if (themeTemp == 2) {
        theme = "BSK";
      } else if (themeTemp == 3) {
        theme = "FOT";
      } else {
        theme = "SIN";
      }

      broochID = getRandomInt(
        0,
        DB[`${theme}_ATK`].length +
          DB[`${theme}_DEF`].length +
          DB[`${theme}_FUN`].length -
          1
      );

      if (broochID < DB[`${theme}_ATK`].length) {
        // ATK가 나온 경우
        brooch = broochID;
        type = "ATK";
      } else if (
        broochID <
        DB[`${theme}_ATK`].length + DB[`${theme}_DEF`].length
      ) {
        // DEF가 나온 경우
        brooch = broochID - DB[`${theme}_ATK`].length;
        type = "DEF";
      } else {
        brooch =
          broochID - DB[`${theme}_ATK`].length - DB[`${theme}_DEF`].length;
        type = "FUN";
      }

      return {
        brooch,
        theme,
        rank,
        type,
      };
    } else {
      // 통테큐 아닐 경우

      // 등급 결정
      if (rankTemp <= 63) {
        rank = "mega";
      } else if (rankTemp <= 60 + 30) {
        rank = "giga";
      } else {
        rank = "tera";
      }

      // 브로치 결정

      broochID = getRandomInt(
        0,
        DB[`SD_${type}`].length +
          DB[`BSK_${type}`].length +
          DB[`FOT_${type}`].length +
          DB[`SIN_${type}`].length -
          1
      );

      if (broochID < DB[`SD_${type}`].length) {
        // SD가 나온 경우
        brooch = broochID;
        theme = "SD";
      } else if (
        broochID <
        DB[`SD_${type}`].length + DB[`BSK_${type}`].length
      ) {
        // BSK가 나온 경우
        brooch = broochID - DB[`SD_${type}`].length;
        theme = "BSK";
      } else if (
        broochID <
        DB[`SD_${type}`].length +
          DB[`BSK_${type}`].length +
          DB[`FOT_${type}`].length
      ) {
        // FOT이 나온 경우
        brooch = broochID - DB[`SD_${type}`].length - DB[`BSK_${type}`].length;
        theme = "FOT";
      } else {
        // SIN이 나온 경우
        brooch =
          broochID -
          DB[`SD_${type}`].length -
          DB[`BSK_${type}`].length -
          DB[`FOT_${type}`].length;
        theme = "SIN";
      }

      return {
        brooch,
        theme,
        rank,
        type,
      };
    }
  }

  function startGacha(type) {
    if (!possible) {
      return;
    } else {
      setPossible(false);
      setTimeout(() => {
        setPossible(true);
      }, 1000);
    }

    let tempList = [];

    while (true) {
      const temp = getBrooch(type);

      if (
        DB[`${temp.theme}_${temp.type}`][temp.brooch][
          temp.rank == "mega" ? 4 : temp.rank == "giga" ? 5 : 6
        ] !== 0
      ) {
        tempList.push(temp);
      }

      if (tempList.length >= 10) {
        break;
      }
    }

    switch (type) {
      case "TERA":
        defaultState.TERA = state.TERA + 10;
        defaultState.ATK = state.ATK;
        defaultState.DEF = state.DEF;
        defaultState.FUN = state.FUN;
        break;

      case "ATK":
        defaultState.TERA = state.TERA;
        defaultState.ATK = state.ATK + 10;
        defaultState.DEF = state.DEF;
        defaultState.FUN = state.FUN;
        break;

      case "DEF":
        defaultState.TERA = state.TERA;
        defaultState.ATK = state.ATK;
        defaultState.DEF = state.DEF + 10;
        defaultState.FUN = state.FUN;
        break;

      case "FUN":
        defaultState.TERA = state.TERA;
        defaultState.ATK = state.ATK;
        defaultState.DEF = state.DEF;
        defaultState.FUN = state.FUN + 10;
        break;
    }

    if (mode !== "gacha") {
      setMode("gacha");
    }

    setState(defaultState);
    setList(tempList);
  }

  return (
    <View style={BroochStyles.container}>
      <Text
        style={{
          marginTop: 20,
          color: "black",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {mode == "gacha" ? "브로치 뽑기" : "내가 획득한 브로치"}
      </Text>

      <View style={BroochStyles.my_list_container}>
        {/* 획득한 아카식 모음 (중요) */}
        <ScrollView style={BroochStyles.my_list_box}>
          <BroochTable
            list={mode == "gacha" ? list : savedList}
            setModalState={setModalState}
            setModalData={setModalData}
          ></BroochTable>
        </ScrollView>
      </View>

      {/* 모드 전환 */}

      <View style={BroochStyles.brooch_head}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={BroochButtonStyles.button}
          onPress={() => {
            defaultState = {
              TERA: 0,
              ATK: 0,
              DEF: 0,
              FUN: 0,
            };
            setState(defaultState);
            setMode("gacha");
            setPossible(true);
            setList([]);
            setSavedList([]);
          }}
        >
          <Text style={{ fontWeight: "bold" }}>초기화</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={BroochButtonStyles.button}
          onPress={() => {
            setMode(mode == "gacha" ? "save0" : "gacha");
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {mode == "gacha" ? "결과보기" : "브로치 뽑기"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={BroochStyles.brooch_btn_container}>
        {/* 뽑기 버튼 */}

        {/* 테라 브로치 */}

        <TouchableOpacity
          activeOpacity={0.5}
          style={BroochStyles.brooch_btn}
          onPress={() => {
            startGacha("TERA");
          }}
        >
          <Image
            style={BroochStyles.brooch_btn_image}
            source={TERA_BTN}
          ></Image>
        </TouchableOpacity>

        {/* 공격형 브로치 */}

        <TouchableOpacity
          activeOpacity={0.5}
          style={BroochStyles.brooch_btn}
          onPress={() => {
            startGacha("ATK");
          }}
        >
          <Image style={BroochStyles.brooch_btn_image} source={ATK_BTN}></Image>
        </TouchableOpacity>

        {/* 방어형 브로치 */}

        <TouchableOpacity
          activeOpacity={0.5}
          style={BroochStyles.brooch_btn}
          onPress={() => {
            startGacha("DEF");
          }}
        >
          <Image style={BroochStyles.brooch_btn_image} source={DEF_BTN}></Image>
        </TouchableOpacity>

        {/* 기능형 브로치 */}

        <TouchableOpacity
          activeOpacity={0.5}
          style={BroochStyles.brooch_btn}
          onPress={() => {
            startGacha("FUN");
          }}
        >
          <Image style={BroochStyles.brooch_btn_image} source={FUN_BTN}></Image>
        </TouchableOpacity>
      </View>

      <View style={BroochStyles.used_brooch_container}>
        {/* 사용 갯수 */}

        {/* 테라 브로치 */}

        <View style={BroochStyles.used_brooch_col}>
          <Image
            style={BroochStyles.used_brooch_col_image}
            source={TERA}
          ></Image>
        </View>
        <View style={BroochStyles.used_brooch_col}>
          <Text style={BroochStyles.used_brooch_col_text}>{state.TERA}</Text>
        </View>
        {/* 공격형 브로치 */}

        <View style={BroochStyles.used_brooch_col}>
          <Image
            style={BroochStyles.used_brooch_col_image}
            source={ATK}
          ></Image>
        </View>
        <View style={BroochStyles.used_brooch_col}>
          <Text style={BroochStyles.used_brooch_col_text}>{state.ATK}</Text>
        </View>

        {/* 방어형 브로치 */}

        <View style={BroochStyles.used_brooch_col}>
          <Image
            style={BroochStyles.used_brooch_col_image}
            source={DEF}
          ></Image>
        </View>
        <View style={BroochStyles.used_brooch_col}>
          <Text style={BroochStyles.used_brooch_col_text}>{state.DEF}</Text>
        </View>

        {/*  기능형 브로치 */}

        <View style={BroochStyles.used_brooch_col}>
          <Image
            style={BroochStyles.used_brooch_col_image}
            source={FUN}
          ></Image>
        </View>
        <View style={BroochStyles.used_brooch_col}>
          <Text style={BroochStyles.used_brooch_col_text}>{state.FUN}</Text>
        </View>
      </View>

      {/* modal start */}

      <Modal
        isVisible={modalState}
        useNativeDriver={true}
        coverScreen={true}
        onBackButtonPress={() => {
          setModalState(false);
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={BroochStyles.modal_head}>
            <Image
              source={DB.Icons[modalData.rank][modalData.type][modalData.theme]}
              style={[
                {
                  resizeMode: "cover",
                  width: 100,
                  height: 100,
                  borderWidth: 5,
                  borderRadius: 5,
                },
                {
                  borderColor:
                    modalData.rank == "tera"
                      ? "#a543cc"
                      : modalData.rank == "giga"
                      ? "#b32442"
                      : "#f7d067",
                },
              ]}
            ></Image>
            <Text
              style={[
                {
                  fontWeight: "bold",
                  fontSize: 20,
                  marginVertical: 20,
                },
                {
                  color:
                    modalData.rank == "tera"
                      ? "#a543cc"
                      : modalData.rank == "giga"
                      ? "#b32442"
                      : "#f7d067",
                },
              ]}
            >
              {`${
                modalData.type == "ATK"
                  ? "공격형"
                  : modalData.type == "DEF"
                  ? "방어형"
                  : "기능형"
              } ${modalData.theme} : ${
                DB[`${modalData.theme}_${modalData.type}`][modalData.brooch][0]
              }`}
            </Text>
          </View>
          <View style={BroochStyles.modal_body}>
            <Text style={{ color: "white", textAlign: "center" }}>
              {`${
                DB[`${modalData.theme}_${modalData.type}`][modalData.brooch][1]
              }`}
            </Text>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              {`+${
                DB[`${modalData.theme}_${modalData.type}`][modalData.brooch][
                  modalData.rank == "mega"
                    ? 4
                    : modalData.rank == "giga"
                    ? 5
                    : 6
                ]
              }`}
            </Text>
            <Text
              style={{
                color: "#9b9281",
                marginTop: 20,
                width: "80%",
                textAlign: "center",
              }}
            >
              가장 기본적이며 널리 보급된{" "}
              {modalData.theme == "SD"
                ? "스탠다드(Standard)"
                : modalData.theme == "BSK"
                ? "버서커(Berserker)"
                : modalData.theme == "FOT"
                ? "포트리스(Fotress)"
                : "어쌔신(Assassin)"}{" "}
              테마의 브로치. 평범한 섬유에 소울 에너지를 흐르게해, 일종의 생명
              섬유로 만들어주는 섬유 확장 디바이스. 편의상 브로치라 칭한다.{" "}
              {modalData.rank == "mega"
                ? "중"
                : modalData.rank == "giga"
                ? "상"
                : "최상"}
              급의 브로치이며,{" "}
              {modalData.type == "ATK"
                ? "공격 관련의 능력을 상승시켜 준다"
                : modalData.type == "DEF"
                ? "방어 관련의 능력을 상승시켜 준다"
                : "특별한 능력의 발동이 가능해진다"}
              {"."}
            </Text>
          </View>
          <View style={BroochStyles.modal_foot}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                BroochButtonStyles.button,
                {
                  backgroundColor: "gray",
                },
              ]}
              onPress={() => {
                setModalState(false);
              }}
            >
              <Text style={BroochButtonStyles.text}>나가기</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={BroochButtonStyles.button}
              onPress={async () => {
                let isSaved = false;
                let tempSavedList = savedList;

                if (mode == "gacha") {
                  const AsyncAlert = async () =>
                    new Promise((resolve) => {
                      Alert.alert(
                        null,
                        "저장하고자 하는 브로치가 가장 최근에 저장한 브로치와 일치합니다.\n정말 저장하시겠습니까?",
                        [
                          {
                            text: "아니요",
                            onPress: () => {
                              resolve("YES");
                            },
                            style: "cancel",
                          },
                          {
                            text: "네",
                            onPress: () => {
                              isSaved = true;
                              resolve("YES");
                            },
                          },
                        ],
                        { cancelable: false }
                      );
                    });

                  if (modalData == savedList[savedList.length - 1]) {
                    await AsyncAlert();
                  } else {
                    isSaved = true;
                  }

                  if (isSaved) {
                    tempSavedList.push(modalData);
                    setSavedList(tempSavedList);

                    showMessage({
                      message: `[${
                        modalData.rank == "mega"
                          ? "메가"
                          : modalData.rank == "giga"
                          ? "기가"
                          : "테라"
                      }] ${
                        modalData.type == "ATK"
                          ? "공격형"
                          : modalData.type == "DEF"
                          ? "방어형"
                          : "기능형"
                      } ${modalData.theme} : ${
                        DB[`${modalData.theme}_${modalData.type}`][
                          modalData.brooch
                        ][0]
                      } 이(가) 저장되었습니다!`,
                      type: "success",
                    });
                  }

                  setModalState(false);
                } else {
                  tempSavedList.splice(tempSavedList.indexOf(modalData), 1);
                  setSavedList(tempSavedList);

                  showMessage({
                    message: `[${
                      modalData.rank == "mega"
                        ? "메가"
                        : modalData.rank == "giga"
                        ? "기가"
                        : "테라"
                    }] ${
                      modalData.type == "ATK"
                        ? "공격형"
                        : modalData.type == "DEF"
                        ? "방어형"
                        : "기능형"
                    } ${modalData.theme} : ${
                      DB[`${modalData.theme}_${modalData.type}`][
                        modalData.brooch
                      ][0]
                    } 이(가) 삭제되었습니다!`,
                    type: "warning",
                  });

                  setModalState(false);
                }
              }}
            >
              <Text style={BroochButtonStyles.text}>
                {mode == "gacha" ? "저장하기" : "삭제하기"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* modal end */}
      <FlashMessage position="top" duration={2000} floating={true} />

      {/* Help start */}

      <TouchableOpacity
        style={HomeStyles.Home_Help_Button}
        activeOpacity={0.5}
        onPress={() => {
          setModalState2(true);
        }}
      >
        <AntDesign name="questioncircle" size={40} color="#454442" />
      </TouchableOpacity>

      <Modal
        style={HomeStyles.Home_Modal}
        isVisible={modalState2}
        coverScreen={true}
        useNativeDriver={true}
        onBackButtonPress={() => {
          setModalState2(false);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setModalState2(false);
          }}
          style={HomeStyles.Home_Help}
        >
          <Image source={Brooch_Help} style={HomeStyles.Home_Image}></Image>
        </TouchableOpacity>
      </Modal>

      {/* Help end */}
    </View>
  );
}

export default Brooch;
