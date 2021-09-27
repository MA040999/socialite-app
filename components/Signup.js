import React from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Navbar from "./Navbar";
import {
  PLACEHOLDER,
  PRIMARY,
  SECONDARY,
  TRANSPARENT,
} from "../constants/colors";
import Button from "./Button";
import { globalStyles } from "../styles/globalStyles";
import MyAppText from "./MyAppText";
import { NUNITO_REGULAR } from "../constants/fonts";

export default function Signup({ navigation }) {
  return (
    <LinearGradient colors={[PRIMARY, SECONDARY]} style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={{ ...styles.postScreen }}>
        <MyAppText style={globalStyles.heading}>Signup</MyAppText>
        <View style={styles.inputsContainer}>
          <TextInput
            textContentType="name"
            placeholder="Full Name"
            placeholderTextColor={PLACEHOLDER}
            autoCompleteType={"name"}
            keyboardType={"default"}
            style={{ color: "white", fontSize: 14, ...styles.input }}
          />
          <TextInput
            textContentType="emailAddress"
            placeholder="Email Address"
            placeholderTextColor={PLACEHOLDER}
            autoCompleteType={"email"}
            keyboardType={"email-address"}
            style={{ color: "white", fontSize: 14, ...styles.input }}
          />
          <TextInput
            textContentType="password"
            placeholder="Password"
            secureTextEntry={true}
            autoCompleteType={"password"}
            placeholderTextColor={PLACEHOLDER}
            style={{ color: "white", fontSize: 14, ...styles.input }}
          />
          <TextInput
            textContentType="password"
            placeholder="Confirm Password"
            secureTextEntry={true}
            autoCompleteType={"password"}
            placeholderTextColor={PLACEHOLDER}
            style={{ color: "white", fontSize: 14, ...styles.input }}
          />
        </View>
        <Button title={"Signup"} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postScreen: {
    backgroundColor: TRANSPARENT,
    borderRadius: 20,
    flex: 1,
    alignSelf: "center",
    marginVertical: 30,
    paddingVertical: 10,
    width: "85%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: "white",
    textTransform: "uppercase",
  },
  inputsContainer: {
    justifyContent: "space-around",
  },
  input: {
    padding: 5,
    marginVertical: 5,
    minWidth: "70%",
    backgroundColor: TRANSPARENT,
    borderRadius: 10,
    fontFamily: NUNITO_REGULAR,
  },
});
