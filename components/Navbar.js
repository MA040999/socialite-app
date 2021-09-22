import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import logo from "../assets/favicon.png";
import { TRANSPARENT } from "../constants/colors";

export default function Navbar() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 50, height: 50 }} />
      <View style={{ ...styles.menuContainer, ...styles.searchBar }}>
        <TextInput
          placeholder="Search..."
          placeholderTextColor={TRANSPARENT}
          style={{ flex: 1, color: "white", fontSize: 15 }}
        />
        <Feather
          style={{ paddingLeft: 5 }}
          name="search"
          size={15}
          color="white"
        />
      </View>
      <TouchableOpacity style={styles.menuContainer}>
        <Entypo name="menu" size={35} color="white" />
      </TouchableOpacity>
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
