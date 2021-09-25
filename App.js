import React from "react";
import { Provider } from "react-redux";
import AppInner from "./AppInner";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}
