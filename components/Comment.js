import React from "react";
import { View, Text } from "react-native";
import Post from "./Post";

export default function Comment() {
  return (
    <View style={{ width: "85%", alignSelf: "center" }}>
      <Post isComment={true} />
    </View>
  );
}
