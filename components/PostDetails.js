import React from "react";
import { StyleSheet, View } from "react-native";
import Post from "./Post";
import { LinearGradient } from "expo-linear-gradient";
import Navbar from "./Navbar";
import { PRIMARY, SECONDARY } from "../constants/colors";
import Comment from "./Comment";
import { ScrollView } from "react-native-gesture-handler";
import CreatePost from "./CreatePost";

export default function PostDetails({ navigation }) {
  return (
    <LinearGradient
      colors={[PRIMARY, SECONDARY]}
      style={styles.postDetailContainer}
    >
      <ScrollView style={{ width: "100%" }}>
        <Navbar navigation={navigation} />
        <Post />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </ScrollView>
      <View style={{ height: 100, justifyContent: "center" }}>
        <CreatePost isComment={true} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  postDetailContainer: {
    width: "100%",
    height: "100%",
  },
});
