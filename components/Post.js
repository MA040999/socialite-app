import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TRANSPARENT } from "../constants/colors";
import icon from "../assets/user-circle.png";
import {
  Feather,
  Ionicons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";

export default function Post() {
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={icon} style={{ width: 40, height: 40 }} />
        <View style={styles.postHeaderUserName}>
          <Text style={{ color: "white" }}>Muhammed Ahmed</Text>
          <Text style={{ fontSize: 10, color: "white" }}>3 minutes ago</Text>
        </View>
        <View style={styles.iconsContainer}>
          <Feather
            style={{ paddingHorizontal: 15 }}
            name="edit"
            size={20}
            color="white"
          />
          <Ionicons name="ios-trash" size={20} color="white" />
        </View>
      </View>
      <View style={styles.postBody}>
        <Text style={{ color: "white" }}>Hellloooo!!!</Text>
      </View>
      <View style={styles.postImagesContainer}>
        <Image source={icon} style={{ width: 60, height: 60 }} />
        <Image source={icon} style={{ width: 60, height: 60 }} />
        <Image source={icon} style={{ width: 60, height: 60 }} />
        <Image source={icon} style={{ width: 60, height: 60 }} />
        <Image source={icon} style={{ width: 60, height: 60 }} />
      </View>
      <View
        style={{ ...styles.iconsContainer, ...styles.likeCommentContainer }}
      >
        <AntDesign name="hearto" size={20} color="white" />
        <Text style={{ color: "white", marginLeft: 5 }}>12</Text>
        <MaterialIcons
          style={{ paddingLeft: 15 }}
          name="comment"
          size={20}
          color="white"
        />
        <Text style={{ color: "white", marginLeft: 5 }}>24</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: TRANSPARENT,
    borderRadius: 25,
    paddingLeft: 5,
    paddingVertical: 8,
    paddingRight: 15,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  postHeaderUserName: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    paddingLeft: 5,
  },
  postBody: {
    marginVertical: 20,
    paddingLeft: 45,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  postImagesContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "80%",
    alignSelf: "center",
  },
  likeCommentContainer: {
    paddingLeft: 45,
    marginVertical: 10,
    marginTop: 30,
  },
});
