import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { Feather, AntDesign, Entypo } from "@expo/vector-icons";
import logo from "../assets/favicon.png";
import { PLACEHOLDER, TRANSPARENT } from "../constants/colors";

export default function Navbar({ navigation }) {
  return (
    <View style={styles.container}>
      {navigation.canGoBack() ? (
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />
      ) : (
        <Image source={logo} style={{ width: 50, height: 50 }} />
      )}
      <View style={{ ...styles.menuContainer, ...styles.searchBar }}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor={PLACEHOLDER}
          style={{ flex: 1, color: "white", fontSize: 13 }}
        />
        <Feather
          style={{ paddingLeft: 5 }}
          name="search"
          size={15}
          color="white"
        />
      </View>
      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.4 : 1 },
          styles.menuContainer,
        ]}
        onPress={() => navigation.openDrawer()}
      >
        <Entypo name="menu" size={35} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 65,
    paddingHorizontal: 20,
    width: "100%",
    paddingTop: 45,
    marginBottom: 25,
  },
  menuContainer: {
    backgroundColor: TRANSPARENT,
    borderRadius: 8,
  },
  searchBar: {
    flex: 0.65,
    color: "white",
    paddingHorizontal: 8,
    height: 35,
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
  },
});
