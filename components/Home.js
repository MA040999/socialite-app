import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";
import { PRIMARY, SECONDARY } from "../constants/colors";

export default function Home({ navigation }) {
  return (
    <LinearGradient colors={[PRIMARY, SECONDARY]} style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <Navbar navigation={navigation} />
        <View style={{ ...styles.container, ...styles.postScreen }}>
          <CreatePost />
          <Posts navigation={navigation} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  postScreen: {
    marginTop: 40,
    justifyContent: "flex-start",
  },
});
