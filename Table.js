import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Animated } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import { AkashicIcon } from "./AkashicIcon";
import DB from "./ConverterDB";

export function OptionTable(props) {
  const itemCode = props.itemCode;

  const [state, setState] = useState({
    tableHead: ["옵션", "최소수치", "최대수치"],
    tableData: DB[itemCode].data,
  });

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Row
          data={state.tableHead}
          style={styles.head}
          textStyle={styles.headText}
        />
        <Rows data={state.tableData} textStyle={styles.text} />
      </Table>
    </View>
  );
}

export function AkashicTable(props) {
  const date = new Date();
  const { list, setModalState, setModalImage } = props;

  let temp = 0;
  var outerLoop = [];
  var myloop = [];

  function setModalState2(bool) {
    setModalState(bool);
  }

  function setModalImage2(image) {
    setModalImage(image);
  }

  if (list.length == 0) {
    return (
      <Text
        key="noContent"
        style={{
          flex: 1,
          fontSize: 25,
          fontWeight: "bold",
          marginTop: 100,
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        획득한 아카식이 없습니다
      </Text>
    );
  }

  for (let i = 0; i < list.length; i++) {
    if (myloop.length == 3) {
      outerLoop.push(
        <View
          style={{
            flexDirection: "row",
          }}
          key={`${i}-${list[i][0]}`}
        >
          {myloop}
        </View>
      );

      myloop = [];
    }

    myloop.push(
      <AkashicIcon
        key={`${temp++}_${date.getTime()}`}
        keyCode={`${temp++}_${date.getTime()}`}
        value={list[i]}
        setModalState={setModalState2}
        setModalImage={setModalImage2}
      ></AkashicIcon>
    );
  }

  outerLoop.push(
    <View
      style={{
        flexDirection: "row",
      }}
      key={`${temp++}-${date.getTime()}`}
    >
      {myloop}
    </View>
  );

  return (
    <View
      style={{
        flexDirection: "column",
        marginBottom: 20,
      }}
    >
      {outerLoop}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
    width: "100%",
    textAlign: "center",
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  headText: { margin: 6, textAlign: "center", fontWeight: "bold" },
  text: { margin: 6, textAlign: "center" },
  akashic_container: {
    flex: 1,
    padding: 16,
    width: "100%",
    textAlign: "center",
  },
});
