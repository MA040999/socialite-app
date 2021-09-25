import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";
import { PRIMARY, SECONDARY } from "../constants/colors";
import { useSelector } from "react-redux";

export default function Home({ navigation }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <LinearGradient colors={[PRIMARY, SECONDARY]} style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={{ ...styles.container, ...styles.postScreen }}>
        {user && <CreatePost />}
        <Posts navigation={navigation} />
      </View>
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
