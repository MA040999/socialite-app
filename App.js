import React from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import AppInner from "./AppInner";
import { PRIMARY } from "./constants/colors";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppInner />
      <StatusBar animated={true}
      translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle='light-content'
        showHideTransition='slide'
      />
    </Provider>
  );
}
