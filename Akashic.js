import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { AkashicStyles, HomeStyles } from "./Styles";
import { AkashicTable } from "./Table";
import { getRandomInt } from "./utils";

// IMAGE

import { akashicDB } from "./AkashicDB";

import N_Cnt from "./src/akashic/akashic_normal.png";
import A_Cnt from "./src/akashic/akashic_advance.png";
import H_Cnt from "./src/akashic/akashic_hidden.png";

import N_Btn from "./src/akashic/akashic_normal_btn.png";
import A_Btn from "./src/akashic/akashic_advance_btn.png";
import H_Btn from "./src/akashic/akashic_hidden_btn.png";

import Akashic_Help from "./src/akashic/akashic_help.png";

function Akashic() {
  let defaultCount = {
    normal: 0,
    advance: 0,
    hidden: 0,
  };

  const [list, setList] = useState([
    //   IMG, Rank
  ]);
  const [savedList, setSavedList] = useState([
    //  IMG, Rank
  ]);
  const [count, setCount] = useState(defaultCount);
  const [mode, setMode] = useState("gacha");
  const [isPossible, setIsPossible] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [modalState2, setModalState2] = useState(false);
  let savedListTemp = [];

  function getNormalAkashic() {
    let rank = 1;
    const isHidden = getRandomInt(0, 4) == 0;
    const percent = Math.random();

    if (percent <= 0.63) {
      // 2성 획득
      rank = 2;
    } else if (percent <= 0.943) {
      // 3성 획득
      rank = 3;
    } else if (percent <= 0.987988) {
      // 4성 획득
      rank = 4;
    } else {
      // 5성 획득
      rank = 5;
    }

    const temp = akashicDB.icons[isHidden ? "hidden" : "normal"][rank - 2]; // 어레이 리턴
    const index = getRandomInt(0, temp.length - 1);

    return [temp[index], rank, index, isHidden]; // 이미지 리턴
  }

  function getAdvanceAkashic() {
    let rank = 1;
    const isHidden = getRandomInt(0, 4) == 0;
    const percent = Math.random();

    if (percent <= 0.8901) {
      // 3성 획득
      rank = 3;
    } else if (percent <= 0.8901 + 0.08) {
      // 4성 획득
      rank = 4;
    } else {
      // 5성 획득
      rank = 5;
    }

    const temp = akashicDB.icons[isHidden ? "hidden" : "normal"][rank - 2]; // 어레이 리턴
    const index = getRandomInt(0, temp.length - 1);

    return [temp[index], rank, index, isHidden]; // 이미지 리턴
  }

  function getHiddenAkashic() {
    let rank = 1;
    const isHidden = true;
    const percent = Math.random();

    if (percent <= 0.63) {
      // 2성 획득
      rank = 2;
    } else if (percent <= 0.943) {
      // 3성 획득
      rank = 3;
    } else if (percent <= 0.987988) {
      // 4성 획득
      rank = 4;
    } else {
      // 5성 획득
      rank = 5;
    }

    const temp = akashicDB.icons[isHidden ? "hidden" : "normal"][rank - 2]; // 어레이 리턴
    const index = getRandomInt(0, temp.length - 1);

    return [temp[index], rank, index, isHidden]; // 이미지 리턴
  }

  function AkashicGacha(type) {
    let akashic_list = [];
    savedListTemp = savedList;

    for (let i = 0; i < 10; i++) {
      const card =
        type == "normal"
          ? getNormalAkashic()
          : type == "advance"
          ? getAdvanceAkashic()
          : getHiddenAkashic();

      if (card[1] == 5) {
        savedList.push(card);
      }

      akashic_list.push(card);
    }

    switch (type) {
      case "normal":
        defaultCount.normal = count.normal += 10;
        defaultCount.advance = count.advance;
        defaultCount.hidden = count.hidden;
        break;
      case "advance":
        defaultCount.normal = count.normal;
        defaultCount.advance = count.advance += 10;
        defaultCount.hidden = count.hidden;
        break;
      case "hidden":
        defaultCount.normal = count.normal;
        defaultCount.advance = count.advance;
        defaultCount.hidden = count.hidden += 10;
        break;
    }

    if (mode !== "gacha") {
      setMode("gacha");
    }

    setSavedList(savedListTemp);
    setList(akashic_list);
    setCount(defaultCount);
  }

  return (
    <View style={AkashicStyles.container}>
      <Text
        style={{
          marginTop: 20,
          color: "black",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {mode == "gacha" ? "아카식 뽑기" : "내가 획득한 5성 "}
      </Text>

      <View style={AkashicStyles.my_list_container}>
        {/* 획득한 아카식 모음 (중요) */}

        <ScrollView style={AkashicStyles.my_list_box}>
          <AkashicTable
            list={mode == "gacha" ? list : savedList}
            setModalState={setModalState}
            setModalImage={setModalImage}
          ></AkashicTable>
        </ScrollView>
      </View>

      {/* 모드 전환 */}

      <View style={AkashicStyles.akashic_head}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={AkashicStyles.button}
          onPress={() => {
            defaultCount = {
              normal: 0,
              advance: 0,
              hidden: 0,
            };
            setCount(defaultCount);
            setList([]);
            setSavedList([]);
            setMode("gacha");
            setIsPossible(true);
          }}
        >
          <Text style={{ fontWeight: "bold" }}>초기화</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={AkashicStyles.button}
          onPress={() => {
            setMode(mode == "gacha" ? "save" : "gacha");
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {mode == "gacha" ? "결과보기(5성)" : "아카식 뽑기"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={AkashicStyles.akashic_btn_container}>
        {/* 뽑기 버튼 */}
        <TouchableOpacity
          activeOpacity={0.5}
          style={AkashicStyles.akashic_btn}
          onPress={() => {
            if (isPossible) {
              setIsPossible(false);
              AkashicGacha("hidden");
              setTimeout(() => {
                setIsPossible(true);
              }, 200);
            }
          }}
        >
          <Image style={AkashicStyles.akashic_btn_image} source={H_Btn}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={AkashicStyles.akashic_btn}
          onPress={() => {
            if (isPossible) {
              setIsPossible(false);
              AkashicGacha("advance");
              setTimeout(() => {
                setIsPossible(true);
              }, 200);
            }
          }}
        >
          <Image style={AkashicStyles.akashic_btn_image} source={A_Btn}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={AkashicStyles.akashic_btn}
          onPress={() => {
            if (isPossible) {
              setIsPossible(false);
              AkashicGacha("normal");
              setTimeout(() => {
                setIsPossible(true);
              }, 200);
            }
          }}
        >
          <Image style={AkashicStyles.akashic_btn_image} source={N_Btn}></Image>
        </TouchableOpacity>
      </View>
      <View style={AkashicStyles.used_akashic_container}>
        {/* 사용 갯수 */}
        <View
          style={[
            AkashicStyles.used_akashic_col,
            {
              flex: 1,
            },
          ]}
        >
          <Image
            style={AkashicStyles.used_akashic_col_image}
            source={H_Cnt}
          ></Image>
        </View>
        <View
          style={[
            AkashicStyles.used_akashic_col,
            {
              flex: 2,
            },
          ]}
        >
          <Text style={AkashicStyles.used_akashic_col_text}>
            {count.hidden}
          </Text>
        </View>

        {/*  */}

        <View
          style={[
            AkashicStyles.used_akashic_col,
            {
              flex: 1,
            },
          ]}
        >
          <Image
            style={AkashicStyles.used_akashic_col_image}
            source={A_Cnt}
          ></Image>
        </View>
        <View
          style={[
            AkashicStyles.used_akashic_col,
            {
              flex: 2,
            },
          ]}
        >
          <Text style={AkashicStyles.used_akashic_col_text}>
            {count.advance}
          </Text>
        </View>

        {/*  */}

        <View
          style={[
            AkashicStyles.used_akashic_col,
            {
              flex: 1,
            },
          ]}
        >
          <Image
            style={AkashicStyles.used_akashic_col_image}
            source={N_Cnt}
          ></Image>
        </View>
        <View
          style={[
            AkashicStyles.used_akashic_col,
            {
              flex: 2,
            },
          ]}
        >
          <Text style={AkashicStyles.used_akashic_col_text}>
            {count.normal}
          </Text>
        </View>
      </View>

      {/*  */}

      {/* modal start */}

      <Modal
        isVisible={modalState}
        useNativeDriver={true}
        coverScreen={true}
        onBackButtonPress={() => {
          setModalState(false);
        }}
      >
        <TouchableOpacity
          style={AkashicStyles.modal}
          activeOpacity={1}
          onPress={() => {
            setModalState(false);
          }}
        >
          <Image source={modalImage} style={AkashicStyles.bgImage}></Image>
        </TouchableOpacity>
      </Modal>

      {/* modal end */}

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
          <Image source={Akashic_Help} style={HomeStyles.Home_Image}></Image>
        </TouchableOpacity>
      </Modal>

      {/* Help end */}
    </View>
  );
}

export default Akashic;
