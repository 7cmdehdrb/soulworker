import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import DB from "./db";

function OptionTable(props) {
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
});

export default OptionTable;
