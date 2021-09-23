import React from "react";
import { View } from "react-native";
import Post from "./Post";

export default function Posts({ navigation }) {
  return (
    <View style={{ width: "100%" }}>
      <Post navigation={navigation} />
      <Post navigation={navigation} />
      <Post navigation={navigation} />
      <Post navigation={navigation} />
      <Post navigation={navigation} />
      <Post navigation={navigation} />
      <Post navigation={navigation} />
      <Post navigation={navigation} />
    </View>
  );
}
