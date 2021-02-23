import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-community/picker";
import { getItemFromAsync, setItemToAsync } from "./AsyncStorage";

const App = (props) => {
  const [selectedValue, setSelectedValue] = useState(0);

  async function init() {
    const temp = await getItemFromAsync("weapon");

    if (temp !== null) {
      setSelectedValue(temp);
    }
  }

  init();

  return (
    <Picker
      selectedValue={selectedValue}
      style={styles.text}
      onValueChange={(selectedItem) => {
        setSelectedValue(selectedItem);
        setItemToAsync("weapon", selectedItem);
      }}
    >
      <Picker.Item label="검(하루 에스티아)" value={0} />
      <Picker.Item label="권총(어윈 아크라이트)" value={1} />
      <Picker.Item label="낫(릴리 블룸메르헨)" value={2} />
      <Picker.Item label="기타(스텔라 유니벨)" value={3} />
      <Picker.Item label="권갑(진 세이파츠)" value={4} />
      <Picker.Item label="해머(이리스 유마)" value={5} />
      <Picker.Item label="도(치이 아루엘)" value={6} />
      <Picker.Item label="창(에프넬)" value={7} />
      <Picker.Item label="라이플(이나비)" value={8} />
    </Picker>
  );
};

const styles = StyleSheet.create({
  text: {
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    fontWeight: "bold",
    color: "black",
  },
});

export default App;
