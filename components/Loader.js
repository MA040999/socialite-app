import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { PRIMARY, SECONDARY } from "../constants/colors";

export default function Loader() {
  return (
    <View
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20,
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
    >
      <ActivityIndicator
        size="small"
        color={SECONDARY}
        style={{
          backgroundColor: PRIMARY,
          borderRadius: 100,
          elevation: 10,
          padding: 8,
        }}
      />
    </View>
  );
}
