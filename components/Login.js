import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { addNotificationMsg } from "../redux/posts/postActions";
import { validateEmail } from "../common/common";
import { login } from "../redux/auth/authActions";

export default function Login({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (email === "" || password === "") {
      dispatch(addNotificationMsg("Please fill both the fields"));
    } else {
      if (validateEmail(email)) {
        dispatch(login({ email, password }, navigation));
      } else {
        dispatch(addNotificationMsg("Email address is invalid"));
      }
    }
  };

  return (
    <LinearGradient colors={[PRIMARY, SECONDARY]} style={styles.container}>
      <Navbar navigation={navigation} />
      <View style={{ ...styles.postScreen }}>
        <Text style={styles.heading}>Login</Text>
        <View style={styles.inputsContainer}>
          <TextInput
            textContentType="emailAddress"
            placeholder="Email Address"
            placeholderTextColor={PLACEHOLDER}
            autoCompleteType={"email"}
            keyboardType={"email-address"}
            style={{ color: "white", fontSize: 14, ...styles.input }}
            onChangeText={setEmail}
          />
          <TextInput
            textContentType="password"
            placeholder="Password"
            secureTextEntry={true}
            autoCompleteType={"password"}
            placeholderTextColor={PLACEHOLDER}
            style={{ color: "white", fontSize: 14, ...styles.input }}
            onChangeText={setPassword}
          />
        </View>
        <Button title={"Login"} handlePress={handleSubmit} />
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
    paddingVertical: 30,
    width: "85%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 20,
    color: "white",
    textTransform: "uppercase",
  },
  inputsContainer: {
    justifyContent: "space-around",
  },
  input: {
    padding: 5,
    marginVertical: 10,
    minWidth: "70%",
    backgroundColor: TRANSPARENT,
    borderRadius: 10,
  },
});
