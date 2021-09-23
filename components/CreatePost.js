import React from "react";
import { View, Text, Image, TextInput, StyleSheet } from "react-native";
import icon from "../assets/user-circle.png";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { TRANSPARENT } from "../constants/colors";

export default function CreatePost() {
  return (
    <View style={styles.createPostContainer}>
      <Image source={icon} style={{ width: 50, height: 50 }} />
      <TextInput
        placeholder="What's on your mind?"
        placeholderTextColor="rgba(221, 221, 221, 0.32)"
        style={{ flex: 1, color: "white", fontSize: 14 }}
      />
      <View style={styles.iconsContainer}>
        <Ionicons
          style={{ paddingHorizontal: 15 }}
          name="images"
          size={20}
          color="white"
        />
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
  },
});
