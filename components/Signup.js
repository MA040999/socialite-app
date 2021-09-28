import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable, Animated } from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import { addNotificationMsg } from "../redux/posts/postActions";
import { validateEmail } from "../common/common";
import { signup } from "../redux/auth/authActions";
import Loader from "./Loader";

export default function Signup({ navigation }) {

  const imageDimension = useRef(new Animated.Value(120)).current;

    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.posts.isLoading);

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
    const validateData = (email, fullname, password) => {
        if (email === "" || fullname === "" || password === "") {
          dispatch(addNotificationMsg("Please fill all the fields"));
        } else {
          if (validateEmail(email)) {
            if (password === confirmPassword) {
              dispatch(signup({ fullname, email, password }, navigation));
            } else {
              dispatch(addNotificationMsg("Passwords are not matching"));
            }
          } else {
            dispatch(addNotificationMsg("Email address is invalid"));
          }
        }
      };

    let handleSubmit = () => {
        validateData(email, fullname, password);
      };

  return (
    <LinearGradient colors={[PRIMARY, SECONDARY]} style={styles.container}>
      <Navbar navigation={navigation} />
      {isLoading && <Loader/>
      }
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
            onChangeText={setFullname}

          />
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
          <TextInput
            textContentType="password"
            placeholder="Confirm Password"
            secureTextEntry={true}
            autoCompleteType={"password"}
            placeholderTextColor={PLACEHOLDER}
            style={{ color: "white", fontSize: 14, ...styles.input }}
            onChangeText={setConfirmPassword}

          />
        </View>
        <Button title={"Signup"} handlePress={handleSubmit} />
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
