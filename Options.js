import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { getRandomInt } from "./utils";
import DB from "./db";

export const OptionButton = (props) => {
  const [state, setState] = useState(0); // 고정 여부
  const code = props.code;
  const val = props.val;
  const id = Number(props.id);

  const tempData = DB[`${code}`].data[props.opt];

  let array = [props.data.a, props.data.b, props.data.c, props.data.d];

  return (
    <TouchableOpacity
      style={state == 0 ? Styles.Option_Btn : Styles.Option_Btn_Selected}
      activeOpacity={1}
      onPress={() => {
        if (state == 0) {
          array[id] = 1;
          setState(1);
          props.setData({
            a: array[0],
            b: array[1],
            c: array[2],
            d: array[3],
          });
        } else {
          array[id] = 0;
          setState(0);
          props.setData({
            a: array[0],
            b: array[1],
            c: array[2],
            d: array[3],
          });
        }
      }}
    >
      <Text style={Styles.Option_Text}>
        {tempData[0]} : {val}
      </Text>
      <AntDesign
        style={state == 0 ? Styles.Option_Icon : Styles.Option_Icon_Selected}
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
