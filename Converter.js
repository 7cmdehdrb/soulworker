import React, { useState } from "react";
import {
  ImageBackground,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import OptionTable from "./Table";
import Option from "./Options";
import { Styles, ButtonStyles, ModalStyles } from "./Styles";
import Selector from "./Selector";
import { defaultState, resetState } from "./state";
import { cFunction, getRandomInt } from "./utils";
import DB from "./db";

// IMG //

import Converter_BG from "./src/converter_patt2.png";
import Converter_Image from "./src/converter.png";

function Converter() {
  const [state, setState] = useState(defaultState);
  const [temp, setTemp] = useState(0);
  const [modalState, setModalState] = useState(false);
  const [startPossible, setStartPossible] = useState(true);

  function startConverter() {
    let exceptionData = [];
    let add = 1;
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
        add *= 2;
      }
    }

    defaultState.converterCnt += add;

    if (lock_cnt <= 2) {
      setState(defaultState);
      setTemp(Math.random());
    } else {
      alert("옵션 잠금은 한번에 2개까지 가능합니다");
    }
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
            </ImageBackground>
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
          <View style={Styles.Start_Part}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={Styles.startbutton}
              onPress={() => {
                if (startPossible) {
                  setStartPossible(false);
                  startConverter();
                  setTimeout(() => {
                    setStartPossible(true);
                  }, 500);
                }
              }}
            >
              <Text style={Styles.starttext}>제련</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        isVisible={modalState}
        coverScreen={true}
        onBackButtonPress={() => {
          setModalState(false);
        }}
      >
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
      </Modal>
    </View>
  );
}

export default Converter;
