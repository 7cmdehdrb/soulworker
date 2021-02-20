import React from "react";
import { View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import FlashMessage from "react-native-flash-message";
import Home from "./Home";
import Converter from "./Converter";
import Akashic from "./Akashic";
import Brooch from "./Brooch";

const App = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "소울워커 시뮬레이터",
      },
    },
    Converter: {
      screen: Converter,
      navigationOptions: {
        title: "컨버터 시뮬레이터",
      },
    },
    Akashic: {
      screen: Akashic,
      navigationOptions: {
        title: "아카식 시뮬레이터",
      },
    },
    Brooch: {
      screen: Brooch,
      navigationOptions: {
        title: "브로치 시뮬레이터",
      },
    },
  },
  {
    initialRouteName: "Home",
  }
);

const AppContainer = createAppContainer(App);

export default () => {
  return <AppContainer></AppContainer>;
};
