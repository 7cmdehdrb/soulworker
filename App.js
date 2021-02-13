import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./Home";
import Converter from "./Converter";

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
  },
  {
    initialRouteName: "Home",
  }
);

const AppContainer = createAppContainer(App);

export default () => {
  return <AppContainer></AppContainer>;
};
