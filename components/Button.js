import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { PRIMARY, SECONDARY } from "../constants/colors";
import MyAppText from "./MyAppText";

export default function Button({ title, handlePress }) {
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
    >
      <LinearGradient
        end={{ x: 1, y: -1 }}
        colors={[PRIMARY, SECONDARY]}
        style={styles.button}
      >
        <MyAppText style={styles.buttonText}>{title}</MyAppText>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: "white",
    textTransform: "uppercase",
  },
});
