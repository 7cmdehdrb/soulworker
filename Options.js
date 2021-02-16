import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { defaultState } from "./state";

export const Option = (props) => {
  const { id, option, value, disable, lock, setState, setTemp } = props;

  return (
    <TouchableOpacity
      style={lock == false ? Styles.Option_Btn : Styles.Option_Btn_Selected}
      activeOpacity={1}
      onPress={() => {
        if (disable == false) {
          if (lock == true) {
            defaultState.options[id].lock = false;
          } else {
            defaultState.options[id].lock = true;
          }
          setState(defaultState);
          setTemp(Math.random());
        }
      }}
    >
      <Text style={Styles.Option_Text}>
        {option} : {value}
      </Text>
      <AntDesign
        style={lock == false ? Styles.Option_Icon : Styles.Option_Icon_Selected}
        name="lock"
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );
};

export const SelectOpion = (props) => {
  const { id, option, value, disable, selectState, setSelectState } = props;

  return (
    <TouchableOpacity
      style={
        id !== String(selectState)
          ? Styles.Option_Btn
          : Styles.Option_Btn_Selecter
      }
      activeOpacity={1}
      onPress={() => {
        if (disable == false) {
          setSelectState(Number(id));
        }
      }}
    >
      <Text style={Styles.Option_Text}>
        {option} : {value}
      </Text>
      <AntDesign
        style={
          id !== String(selectState)
            ? Styles.Option_Icon
            : Styles.Option_Icon_Selected
        }
        name="lock"
        size={24}
        color="black"
      />
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  Option_Btn: {
    flex: 1,
    width: "90%",
    flexDirection: "row",
    marginVertical: 4,
    backgroundColor: "#3b393c",
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  Option_Btn_Selected: {
    flex: 1,
    width: "90%",
    flexDirection: "row",
    marginVertical: 4,
    backgroundColor: "#2c282d",
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  Option_Btn_Selecter: {
    flex: 1,
    width: "90%",
    flexDirection: "row",
    marginVertical: 4,
    backgroundColor: "#558bc7",
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  Option_Icon: {
    marginRight: 10,
    fontWeight: "bold",
    color: "#101010",
    textShadowColor: "black",
    textShadowRadius: 4,
  },
  Option_Icon_Selected: {
    marginRight: 10,
    fontWeight: "bold",
    color: "#a29eac",
    textShadowColor: "#a29eac",
    textShadowRadius: 4,
  },
  Option_Text: {
    marginLeft: 10,
    fontWeight: "bold",
    color: "#a29eac",
    textShadowColor: "black",
    textShadowRadius: 10,
  },
});
