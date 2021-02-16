import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  Converter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  Converter_Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292929",
    opacity: 70,
    width: "80%",
    marginTop: "1%",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  Converter_Item: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  Converter_Image: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  Item_Image: {
    position: "absolute",
    alignSelf: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  Converter_Point: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  Converter_Point_Bar: {
    flex: 3,
    marginHorizontal: 5,
  },
  Converter_Point_Text: {
    flex: 1,
    color: "#c8a152",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 8,
    fontWeight: "bold",
  },
  Converter_Point_Box: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  Converter_Point_Image: {
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    resizeMode: "contain",
  },
  Converter_Point_Button: {
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    justifyContent: "center",
    borderColor: "#171518",
    borderWidth: 5,
    borderRadius: 10,
    shadowColor: "black",
  },
  Converter_Point_Button_Button: {
    borderRadius: 5,
    backgroundColor: "#404040",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  Converter_Name: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#302923",
    borderWidth: 3,
    borderColor: "#ffd66a",
    borderRadius: 5,
    width: "100%",
    marginTop: 5,
  },
  orange_text: {
    fontWeight: "bold",
    color: "#ffd66a",
  },
  Converter_Option: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
  },
  Converter_Part: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    marginBottom: 5,
  },
  Converter_Part_Converter: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#101010",
    borderRadius: 5,
    marginRight: 2,
  },
  Converter_Part_Converter_Converter: {
    flex: 3,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
  },
  Converter_Part_Converter_Count: {
    flex: 6,
    color: "#9c9aa5",
    justifyContent: "center",
    alignItems: "center",
  },
  gray_text: {
    color: "#a09fa7",
  },
  orange_text: {
    color: "#fab260",
  },
  Converter_Part_Fix: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#101010",
    borderRadius: 5,
    marginLeft: 2,
  },
  Option_Part: {
    flex: 3,
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 10,
    marginBottom: 5,
    paddingBottom: 5,
  },
  Option_Head: {
    flex: 1,
    width: "99%",
    flexDirection: "row",
    marginVertical: 4,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Option_Head_Text: {
    color: "#a1a0a6",
    textShadowColor: "black",
    textShadowRadius: 4,
  },
  Start_Part: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  // ====================== //
  startbutton: {
    width: "65%",
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: "#4a454b",
    justifyContent: "center",
    alignItems: "center",
  },
  starttext: {
    color: "#a7a3b2",
    textShadowColor: "black",
    textShadowRadius: 4,
  },
  // ====================== //
  OptionTableHead: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 30,
  },
  OptionTableBtn: {
    width: "30%",
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 30,
    backgroundColor: "#4a454b",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  OptionTableText: {
    color: "white",
  },
});

export const ButtonStyles = StyleSheet.create({
  button: {
    width: "90%",
    paddingVertical: 5,
    marginVertical: 3,
    borderRadius: 5,
    backgroundColor: "#fad15d",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    textShadowColor: "black",
    textShadowRadius: 2,
  },
});

export const OptionStyles = StyleSheet.create({
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

export const ModalStyles = StyleSheet.create({
  ModalStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export const HomeStyles = StyleSheet.create({
  Home: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  Home_Head: {
    flex: 2,
    width: "80%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },
  Home_Button: {
    flex: 1,
    flexDirection: "row",
    width: "80%",
    borderRadius: 10,
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    resizeMode: "contain",
  },
  Home_Text: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
  },
});
