import React from "react";
import { TouchableOpacity, Text, Image } from "react-native";
import * as BroochDB from "./BroochDB";

export function BroochIcon(props) {
  const { data, setModalState, setModalData } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {
        setModalData(data);
        setModalState(true);
      }}
    >
      <Image
        source={BroochDB.Icons[data.rank][data.type][data.theme]}
        style={[
          {
            borderWidth: 2,
            borderRadius: 5,
          },
          {
            borderColor:
              data.rank == "tera"
                ? "#a543cc"
                : data.rank == "giga"
                ? "#b32442"
                : "#f7d067",
          },
        ]}
      ></Image>
      <Text
        style={[
          {
            fontWeight: "bold",
            marginTop: 5,
          },
          {
            color:
              data.rank == "tera"
                ? "#a543cc"
                : data.rank == "giga"
                ? "#b32442"
                : "#f7d067",
          },
        ]}
      >
        {BroochDB[`${data.theme}_${data.type}`][data.brooch][0]}
      </Text>
    </TouchableOpacity>
  );
}
