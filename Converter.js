import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { Bar } from "react-native-progress";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { OptionTable } from "./Table";
import { Option, SelectOpion, OptionDisplay } from "./ConverterOptions";
import { Styles, ButtonStyles, ModalStyles, HomeStyles } from "./Styles";
import Selector from "./ConverterSelector";
import { defaultState, resetState } from "./ConverterState";
import { cFunction, getRandomInt } from "./utils";
import { getItemFromAsync } from "./AsyncStorage";
import DB from "./ConverterDB";

// File //

import Converter_BG from "./src/converter/converter_patt2.png";
import Converter_Image from "./src/converter/converter.png";
import Cell_Image from "./src/converter/cell.png";
import Converter_Help from "./src/converter/converter_help.png";

function Converter() {
  const [state, setState] = useState(defaultState);
  const [mode, setMode] = useState("converter");
  const [temp, setTemp] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [modalState2, setModalState2] = useState(false);
  const [startPossible, setStartPossible] = useState(true);
  const [selectState, setSelectState] = useState(0);

  const [sound, setSound] = useState();
  const [soundOption, setSoundOption] = useState(false);

  async function init() {
    const opt = await getItemFromAsync("converter");
    setSoundOption(opt);
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./src/sound/akashic.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }

  React.useEffect(() => {
    init();

    return sound
      ? () => {
          console.log("unloading");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function startConverter() {
    let exceptionData = [];
    let converterCntAdd = 1;
    let converterPointAdd = 0.05;
    let lock_cnt = 0;
    let j = 0;

    for (let i = 0; i < 4; i++) {
      if (defaultState.options[`opt${i + 1}`].lock) {
        lock_cnt++;
        converterCntAdd *= 2;
        converterPointAdd *= 2;
      }
    }

    // 멈춤조건

    if (lock_cnt >= 3) {
      Alert.alert(
        null,
        "옵션 잠금은 최대 2개까지 가능합니다",
        [
          {
            text: "확인",
          },
        ],
        { cancelable: false }
      );
      return;
    } else if (state.itemCode == "undefined") {
      Alert.alert(
        null,
        "장비를 선택해주세요!",
        [
          {
            text: "확인",
          },
        ],
        { cancelable: false }
      );
      return;
    }

    // 멈춤조건 END

    for (let i = 1; i < 5; i++) {
      defaultState.beforeOptions[`opt${i}`].option =
        state.options[`opt${i}`].option;
      defaultState.beforeOptions[`opt${i}`].value =
        state.options[`opt${i}`].value;
    }

    for (let i = 0; i < 4; i++) {
      if (defaultState.options[`opt${i + 1}`].lock == true) {
        exceptionData.push(defaultState.options[`opt${i + 1}`].option);
      }
    }

    const selectedOption = cFunction(
      DB[defaultState.itemCode].data.length - 1,
      exceptionData
    );

    for (let i = 0; i < 4; i++) {
      if (defaultState.options[`opt${i + 1}`].lock == false) {
        defaultState.options[`opt${i + 1}`].option = selectedOption[j];
        defaultState.options[`opt${i + 1}`].value = getRandomInt(
          DB[defaultState.itemCode].data[selectedOption[j]][1],
          DB[defaultState.itemCode].data[selectedOption[j]][2]
        );
        j++;
      }
    }

    defaultState.converterCnt += converterCntAdd;
    defaultState.converterPoint += converterPointAdd;

    setMode("loading");
    setState(defaultState);
    setTemp(Math.random());
    setTimeout(() => {
      setMode("restore");
    }, 700);

    if (soundOption) {
      playSound();
    }

    return true;
  }

  function startSelectConverter() {
    // 멈춤조건

    if (state.converterPoint < 1) {
      Alert.alert(
        null,
        "선택 제련 포인트가 부족합니다!\n포인트 충전 셀을 이용해 포인트를 충전해주세요",
        [
          {
            text: "확인",
          },
        ],
        { cancelable: false }
      );
      return;
    } else if (state.itemCode == "undefined") {
      Alert.alert(
        null,
        "장비를 선택해주세요!",
        [
          {
            text: "확인",
          },
        ],
        { cancelable: false }
      );
      return;
    }

    // 멈춤조건 END

    if ((1 <= selectState) & (selectState <= 4)) {
      for (let i = 1; i < 5; i++) {
        defaultState.beforeOptions[`opt${i}`].option =
          state.options[`opt${i}`].option;
        defaultState.beforeOptions[`opt${i}`].value =
          state.options[`opt${i}`].value;
      }

      defaultState.options[`opt${selectState}`].value = getRandomInt(
        DB[defaultState.itemCode].data[
          defaultState.options[`opt${selectState}`].option
        ][1],
        DB[defaultState.itemCode].data[
          defaultState.options[`opt${selectState}`].option
        ][2]
      );
      defaultState.converterPoint -= 1;
      setMode("loading");
      setTimeout(() => {
        setSelectState(0);
        setMode("restore");
      }, 700);
      setState(defaultState);

      if (soundOption) {
        playSound();
      }

      return true;
    } else {
      Alert.alert(
        null,
        "선택 제련할 옵션을 선택해주세요",
        [
          {
            text: "확인",
          },
        ],
        { cancelable: false }
      );
    }

    return false;
  }

  function restoreConverter() {
    for (let i = 1; i < 5; i++) {
      defaultState.options[`opt${i}`].option =
        state.beforeOptions[`opt${i}`].option;
      defaultState.options[`opt${i}`].value =
        state.beforeOptions[`opt${i}`].value;
    }
    setState(defaultState);
    setMode("converter");
  }

  return (
    <View style={Styles.Converter}>
      <View style={Styles.Converter_Container}>
        {mode == "restore" ? (
          <View style={Styles.Converter_Item}>
            <View style={[Styles.Option_Part]}>
              <OptionDisplay
                option={
                  DB[state.itemCode].data[state.beforeOptions.opt1.option][0]
                }
                value={state.beforeOptions.opt1.value}
              ></OptionDisplay>
              <OptionDisplay
                option={
                  DB[state.itemCode].data[state.beforeOptions.opt2.option][0]
                }
                value={state.beforeOptions.opt2.value}
              ></OptionDisplay>
              <OptionDisplay
                option={
                  DB[state.itemCode].data[state.beforeOptions.opt3.option][0]
                }
                value={state.beforeOptions.opt3.value}
              ></OptionDisplay>
              <OptionDisplay
                option={
                  DB[state.itemCode].available == 4
                    ? DB[state.itemCode].data[
                        state.beforeOptions.opt4.option
                      ][0]
                    : "옵션없음"
                }
                value={
                  DB[state.itemCode].available == 4
                    ? state.beforeOptions.opt4.value
                    : "-"
                }
              ></OptionDisplay>
              <View style={Styles.Option_Head}>
                <View style={Styles.Start_Part}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={Styles.startbutton}
                    onPress={() => {
                      // 복구함수
                      restoreConverter();
                    }}
                  >
                    <Text style={Styles.starttext}>복구</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={Styles.Converter_Item}>
            <View style={Styles.Converter_Image}>
              <ImageBackground source={Converter_BG} style={Styles.bgImage}>
                <Image
                  source={DB[state.itemCode].image}
                  style={Styles.Item_Image}
                />

                <View style={Styles.Converter_Point_Box}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      defaultState.converterPoint += 1;
                      setState(defaultState);
                      setTemp(Math.random());
                    }}
                  >
                    <Image
                      source={Cell_Image}
                      style={Styles.Converter_Point_Image}
                    ></Image>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={state.converterPoint >= 1 ? 0.8 : 1}
                    style={[
                      Styles.Converter_Point_Button,
                      state.converterPoint >= 1
                        ? {
                            backgroundColor: "#534d54",
                          }
                        : {
                            backgroundColor: "#2d2d2d",
                          },
                    ]}
                    onPress={() => {
                      if (state.converterPoint >= 1) {
                        setSelectState(0);
                        setMode(mode == "converter" ? "select" : "converter");
                      }
                    }}
                  >
                    <Text
                      style={
                        state.converterPoint >= 1
                          ? { color: "#a6a2b0" }
                          : { color: "#666666" }
                      }
                    >
                      선택제련
                    </Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
            <View style={Styles.Converter_Point}>
              <Bar
                style={Styles.Converter_Point_Bar}
                progress={state.converterPoint}
                width={null}
                color="#ecbd61"
              />
              <Text style={Styles.Converter_Point_Text}>
                {(state.converterPoint * 100).toFixed(0)} / 100
              </Text>
            </View>
            <View style={Styles.Converter_Name}>
              <Selector
                style={Styles.orange_text}
                value={state.itemCode}
                setState={setState}
                setMode={setMode}
                setTemp={setTemp}
              ></Selector>
            </View>
          </View>
        )}

        <View style={Styles.Converter_Option}>
          <View style={Styles.Converter_Part}>
            <View style={Styles.Converter_Part_Converter}>
              <Image
                source={Converter_Image}
                style={Styles.Converter_Part_Converter_Converter}
              ></Image>
              <View style={Styles.Converter_Part_Converter_Count}>
                <Text style={Styles.gray_text}>사용한 컨버터</Text>
                <Text style={Styles.orange_text}>{state.converterCnt}개</Text>
              </View>
            </View>
            <View style={Styles.Converter_Part_Fix}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={ButtonStyles.button}
                onPress={() => {
                  setModalState(true);
                }}
              >
                <Text style={ButtonStyles.text}>옵션보기</Text>
              </TouchableOpacity>
              {/*  */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={ButtonStyles.button}
                onPress={async () => {
                  const AsyncAlert = async () =>
                    new Promise((resolve) => {
                      Alert.alert(
                        null,
                        "초기화시 모든 옵션, 사용한 컨버터 수, 제련 포인트가 초기화됩니다.\n정말 초기화 하시겠습니까?",
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
                              resetState();
                              setMode("converter");
                              setState(defaultState);
                              setTemp(Math.random());
                              resolve("YES");
                            },
                          },
                        ],
                        { cancelable: false }
                      );
                    });

                  await AsyncAlert();
                }}
              >
                <Text style={ButtonStyles.text}>초기화</Text>
              </TouchableOpacity>
            </View>
          </View>

          {mode == "loading" ? (
            <View style={Styles.Option_Part}>
              <AnimatedCircularProgress
                size={120}
                width={15}
                fill={100}
                lineCap="round"
                rotation={0}
                duration={700}
                tintColor="#c8a152"
                children={() => {
                  return <Text style={{ color: "#c8a152" }}>제련중...</Text>;
                }}
                onAnimationComplete={() => {}}
              />
            </View>
          ) : mode == "converter" || mode == "restore" ? (
            <View style={Styles.Option_Part}>
              <View style={Styles.Option_Head}>
                <Text style={Styles.Option_Head_Text}>변경 가능 옵션</Text>
              </View>
              <Option
                id="opt1"
                option={DB[state.itemCode].data[state.options.opt1.option][0]}
                value={state.options.opt1.value}
                temp={temp}
                mode={mode}
                lock={state.options.opt1.lock}
                setState={setState}
                setTemp={setTemp}
                disable={false}
              ></Option>
              <Option
                id="opt2"
                option={DB[state.itemCode].data[state.options.opt2.option][0]}
                value={state.options.opt2.value}
                temp={temp}
                mode={mode}
                lock={state.options.opt2.lock}
                setState={setState}
                setTemp={setTemp}
                disable={false}
              ></Option>
              <Option
                id="opt3"
                option={DB[state.itemCode].data[state.options.opt3.option][0]}
                value={state.options.opt3.value}
                temp={temp}
                mode={mode}
                lock={state.options.opt3.lock}
                setState={setState}
                setTemp={setTemp}
                disable={false}
              ></Option>
              <Option
                id="opt4"
                option={
                  DB[state.itemCode].available == 4
                    ? DB[state.itemCode].data[state.options.opt4.option][0]
                    : "옵션없음"
                }
                value={
                  DB[state.itemCode].available == 4
                    ? state.options.opt4.value
                    : "-"
                }
                temp={temp}
                mode={mode}
                lock={state.options.opt4.lock}
                setState={setState}
                setTemp={setTemp}
                disable={DB[state.itemCode].available == 4 ? false : true}
              ></Option>
            </View>
          ) : (
            <View style={Styles.Option_Part}>
              <View style={Styles.Option_Head}>
                <Text
                  style={[
                    Styles.Option_Head_Text,
                    {
                      color: "#fad15d",
                    },
                  ]}
                >
                  {mode == "select" ? "선택 제련 모드" : "복구 모드"}
                </Text>
              </View>
              <SelectOpion
                id="1"
                option={DB[state.itemCode].data[state.options.opt1.option][0]}
                value={state.options.opt1.value}
                temp={temp}
                selectState={selectState}
                setSelectState={setSelectState}
                disable={
                  state.options.opt1.value ==
                  DB[state.itemCode].data[state.options.opt1.option][2]
                    ? true
                    : false
                }
              ></SelectOpion>
              <SelectOpion
                id="2"
                option={DB[state.itemCode].data[state.options.opt2.option][0]}
                value={state.options.opt2.value}
                temp={temp}
                selectState={selectState}
                setSelectState={setSelectState}
                disable={
                  state.options.opt2.value ==
                  DB[state.itemCode].data[state.options.opt2.option][2]
                    ? true
                    : false
                }
              ></SelectOpion>
              <SelectOpion
                id="3"
                option={DB[state.itemCode].data[state.options.opt3.option][0]}
                value={state.options.opt3.value}
                temp={temp}
                selectState={selectState}
                setSelectState={setSelectState}
                disable={
                  state.options.opt3.value ==
                  DB[state.itemCode].data[state.options.opt3.option][2]
                    ? true
                    : false
                }
              ></SelectOpion>
              <SelectOpion
                id="4"
                option={
                  DB[state.itemCode].available == 4
                    ? DB[state.itemCode].data[state.options.opt4.option][0]
                    : "옵션없음"
                }
                value={
                  DB[state.itemCode].available == 4
                    ? state.options.opt4.value
                    : "-"
                }
                temp={temp}
                selectState={selectState}
                setSelectState={setSelectState}
                disable={
                  DB[state.itemCode].available == 4
                    ? false
                    : state.options.opt4.value ==
                      DB[state.itemCode].data[state.options.opt4.option][2]
                    ? true
                    : false
                }
              ></SelectOpion>
            </View>
          )}

          <View style={Styles.Start_Part}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={Styles.startbutton}
              onPress={() => {
                if (startPossible) {
                  if (mode == "converter") {
                    setStartPossible(false);
                    startConverter();
                  } else if (mode == "select") {
                    setStartPossible(false);
                    startSelectConverter();
                  } else if (mode == "restore") {
                    setMode("converter");
                  }

                  setTimeout(() => {
                    setStartPossible(true);
                  }, 700);
                }
              }}
            >
              <Text style={Styles.starttext}>
                {mode == "select"
                  ? "선택 제련"
                  : mode == "converter"
                  ? "제련"
                  : mode == "restore"
                  ? "확인"
                  : "제련중..."}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* modal start */}

      <Modal
        isVisible={modalState}
        coverScreen={true}
        useNativeDriver={true}
        onBackButtonPress={() => {
          setModalState(false);
        }}
      >
        <ScrollView>
          <View style={ModalStyles.ModalStyle}>
            <Text style={Styles.OptionTableHead}>옵션 정보</Text>
            <OptionTable itemCode={state.itemCode}></OptionTable>
            <TouchableOpacity
              activeOpacity={0.8}
              style={Styles.OptionTableBtn}
              onPress={() => {
                setModalState(false);
              }}
            >
              <Text style={Styles.OptionTableText}>확인</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>

      {/* modal end */}

      <TouchableOpacity
        style={HomeStyles.Home_Help_Button}
        activeOpacity={0.5}
        onPress={() => {
          setModalState2(true);
        }}
      >
        <AntDesign name="questioncircle" size={40} color="gray" />
      </TouchableOpacity>

      {/* Modal Start */}

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
          <Image source={Converter_Help} style={HomeStyles.Home_Image}></Image>
        </TouchableOpacity>
      </Modal>

      {/* Modal End */}
    </View>
  );
}

export default Converter;
