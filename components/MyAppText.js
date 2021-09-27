import React from "react";
import { Text } from "react-native";
import { NUNITO_REGULAR } from "../constants/fonts";

export default (props) => (
  <Text {...props} style={[{ fontFamily: NUNITO_REGULAR }, props.style]}>
    {props.children}
  </Text>
);
