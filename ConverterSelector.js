import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-community/picker";
import { defaultState, resetState } from "./ConverterState";

const App = (props) => {
  const [selectedValue, setSelectedValue] = useState("undefined");
  const { setState, setTemp, value, setMode } = props;

  return (
    <Picker
      selectedValue={value}
      style={styles.text}
      onValueChange={(selectedItem) => {
        resetState();
        setMode("converter");
        defaultState.itemCode = selectedItem;
        setSelectedValue(selectedItem);
        setState(defaultState);
        setTemp(Math.random());
      }}
    >
      <Picker.Item label="장비 선택" value="undefined" enabled={false} />
      {/* 바썬 */}
      <Picker.Item label="페일 애쉬스 웨폰 히어로" value="vs_wp_hr" />
      <Picker.Item label="페일 애쉬스 웨폰 익스텐드" value="vs_wp_ex" />
      <Picker.Item label="페일 애쉬스 웨폰 스탠다드" value="vs_wp_st" />
      <Picker.Item label="페일 애쉬스 기어 히어로" value="vs_gr_hr" />
      <Picker.Item label="페일 애쉬스 기어 익스텐드" value="vs_gr_ex" />
      <Picker.Item label="페일 애쉬스 기어 스탠다드" value="vs_gr_st" />
      <Picker.Item label="페일 애쉬스 프로미넌스(이어링)" value="vs_ac_ear" />
      <Picker.Item label="페일 애쉬스 오로라(펜던트)" value="vs_ac_pend" />
      <Picker.Item label="페일 애쉬스 스피큘/플레어(링)" value="vs_ac_ring" />
      {/* 루나폴 */}
      <Picker.Item label="트와일라잇 웨폰 익스텐드" value="lunar_wp_ex" />
      <Picker.Item label="트와일라잇 웨폰 스탠다드" value="lunar_wp_st" />
      <Picker.Item label="트와일라잇 기어 익스텐드" value="lunar_gr_ex" />
      <Picker.Item label="트와일라잇 기어 스탠다드" value="lunar_gr_st" />
      <Picker.Item label="트와일라잇 글로우(이어링)" value="lunar_ac_ear" />
      <Picker.Item label="트와일라잇 엣지(펜던트)" value="lunar_ac_pend" />
      <Picker.Item label="트와일라잇 크라운(링)" value="lunar_ac_ring" />
    </Picker>
  );
};

const styles = StyleSheet.create({
  text: {
    width: "100%",
    height: "100%",
    alignContent: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: "#ffd66a",
  },
});

export default App;
