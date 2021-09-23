import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import Posts from "../components/Posts";

export default function Home({navigation}) {
    return (
    <LinearGradient colors={["#211663", "#0cae88"]} style={styles.container}>
        <ScrollView style={{ width: "100%" }}>
            <Navbar />
            <View style={{ ...styles.container, ...styles.postScreen }}>
                <CreatePost />
                <Posts navigation={navigation}/>
            </View>
            {/* <StatusBar  barStyle="light-content" translucent={true} /> */}
        </ScrollView>
        <StatusBar style="light" backgroundColor="#211663" />
    </LinearGradient>
    )
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
