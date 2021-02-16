import React, { useState } from "react";
import {
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
import OptionTable from "./Table";
import { Option, SelectOpion } from "./Options";
import { Styles, ButtonStyles, ModalStyles } from "./Styles";
import Selector from "./Selector";
import { defaultState, resetState } from "./state";
import { cFunction, getRandomInt } from "./utils";
import DB from "./db";

// File //

import Converter_BG from "./src/converter_patt2.png";
import Converter_Image from "./src/converter.png";
import Cell_Image from "./src/cell.png";

import { Audio } from "expo-av";
import loadingMP3 from "./src/loading.mp3";

function Converter() {
  const [state, setState] = useState(defaultState);
  const [mode, setMode] = useState("converter");
  const [selectState, setSelectState] = useState(0);
  const [temp, setTemp] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [startPossible, setStartPossible] = useState(true);
  const [sound, setSound] = React.useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(loadingMP3);
    setSound(sound);
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  function startConverter() {
    let exceptionData = [];
    let converterCntAdd = 1;
    let converterPointAdd = 0.05;
    let lock_cnt = 0;
    let j = 0;

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
      } else {
        lock_cnt++;
        converterCntAdd *= 2;
        converterPointAdd *= 2;
      }
    }

    defaultState.converterCnt += converterCntAdd;
    defaultState.converterPoint += converterPointAdd;

    if (lock_cnt <= 2) {
      setState(defaultState);
      setTemp(Math.random());
    } else {
      alert("옵션 잠금은 한번에 2개까지 가능합니다");
    }
  }

  function startSelectConverter() {
    if (state.converterPoint < 1) {
      alert("선택 제련 포인트가 부족합니다");
    } else {
      if ((1 <= selectState) & (selectState <= 4)) {
        defaultState.options[`opt${selectState}`].value = getRandomInt(
          DB[defaultState.itemCode].data[
            defaultState.options[`opt${selectState}`].option
          ][1],
          DB[defaultState.itemCode].data[
            defaultState.options[`opt${selectState}`].option
          ][2]
        );
        defaultState.converterPoint -= 1;
        setState(defaultState);
        setSelectState(0);
        return true;
      } else {
        alert("선택 제련할 옵션을 선택해주세요");
      }
    }

    return false;
  }

  return (
    <View style={Styles.Converter}>
      <View style={Styles.Converter_Container}>
        <View style={Styles.Converter_Item}>
          <View style={Styles.Converter_Image}>
            <ImageBackground source={Converter_BG} style={Styles.bgImage}>
              <Image
                source={DB[state.itemCode].image}
                style={Styles.Item_Image}
              ></Image>

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
              setTemp={setTemp}
            ></Selector>
          </View>
        </View>
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
                <Text style={ButtonStyles.text}>옵션보기 ▶</Text>
              </TouchableOpacity>
              {/*  */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={ButtonStyles.button}
                onPress={() => {
                  resetState();
                  setState(defaultState);
                  setTemp(Math.random());
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
                onAnimationComplete={() => {
                  setMode("converter");
                }}
              />
            </View>
          ) : mode == "converter" ? (
            <View style={Styles.Option_Part}>
              <View style={Styles.Option_Head}>
                <Text style={Styles.Option_Head_Text}>변경 가능 옵션</Text>
              </View>
              <Option
                id="opt1"
                option={DB[state.itemCode].data[state.options.opt1.option][0]}
                value={state.options.opt1.value}
                temp={temp}
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
                  선택 제련 모드
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
                  setStartPossible(false);

                  if (mode == "converter") {
                    startConverter();
                    setMode("loading");
                    playSound();
                  } else if (mode == "select") {
                    if (startSelectConverter()) {
                      setMode("loading");
                      playSound();
                    }
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
    </View>
  );
}

export default Converter;
