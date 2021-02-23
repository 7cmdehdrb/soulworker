import React, { useState } from "react";
import { View, Switch, Text } from "react-native";
import { SettingStyles } from "./Styles";
import { getItemFromAsync, setItemToAsync } from "./AsyncStorage";

export const Settings = () => {
  const [converter, setConverter] = useState(false);
  const [akashic, setAkashic] = useState(false);
  const [brooch, setBrooch] = useState(false);

  function convertConverter() {
    let temp = converter;

    setItemToAsync("converter", !temp);
    setConverter(!temp);
  }

  function convertAkashic() {
    let temp = akashic;

    setItemToAsync("akashic", !temp);
    setAkashic(!temp);
  }

  function convertBrooch() {
    let temp = brooch;

    setItemToAsync("brooch", !temp);
    setBrooch(!temp);
  }

  async function init() {
    const con = await getItemFromAsync("converter");
    const aka = await getItemFromAsync("akashic");
    const bro = await getItemFromAsync("brooch");

    setConverter(con);
    setAkashic(aka);
    setBrooch(bro);
  }

  init();

  return (
    <View style={SettingStyles.container}>
      <View style={SettingStyles.head}></View>

      <View style={SettingStyles.box}>
        <Text style={SettingStyles.text}>컨버터 효과음</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor="#f4f3f4"
          onValueChange={convertConverter}
          value={converter}
        />
      </View>

      {/*  */}

      <View style={SettingStyles.box}>
        <Text style={SettingStyles.text}>아카식 효과음</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor="#f4f3f4"
          onValueChange={convertAkashic}
          value={akashic}
        />
      </View>

      {/*  */}

      <View style={SettingStyles.box}>
        <Text style={SettingStyles.text}>브로치 효과음</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor="#f4f3f4"
          onValueChange={convertBrooch}
          value={brooch}
        />
      </View>

      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            color: "gray",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          건의 / 버그제보
        </Text>
        <Text style={{ color: "gray", textAlign: "center" }}>
          카카오톡: https://open.kakao.com/o/sy03ynkb
        </Text>
        <Text style={{ color: "gray", textAlign: "center" }}>
          이메일: 7cmdehdrb@naver.com
        </Text>
        <Text style={{ color: "gray", textAlign: "center" }}>
          © 2021. 소유아이 all rights reserved.
        </Text>
      </View>
    </View>
  );
};
