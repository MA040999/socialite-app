import React from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import icon from "../assets/user-circle.png";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { PLACEHOLDER, PRIMARY, TRANSPARENT } from "../constants/colors";

export default function CreatePost({ isComment }) {
  return (
    <View
      style={
        isComment
          ? { ...styles.createPostContainer, ...styles.commentCreator }
          : { ...styles.createPostContainer }
      }
    >
      <Image source={icon} style={{ width: 50, height: 50 }} />
      <TextInput
        placeholder="What's on your mind?"
        placeholderTextColor={PLACEHOLDER}
        style={{ flex: 1, color: "white", fontSize: 14 }}
      />

      <View style={styles.iconsContainer}>
        {!isComment && (
          <Ionicons
            style={{ paddingRight: 15 }}
            name="images"
            size={20}
            color="white"
          />
        )}
        <FontAwesome name="send" size={20} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  createPostContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: TRANSPARENT,
    paddingLeft: 5,
    paddingVertical: 8,
    paddingRight: 15,
    borderRadius: 25,
    marginHorizontal: 8,
    marginBottom: 50,
    marginTop: -30,
  },
  iconsContainer: {
    flexDirection: "row",
    paddingLeft: 15,
  },
  commentCreator: {
    marginBottom: 0,
    marginTop: 0,
    backgroundColor: PRIMARY,
  },
});
