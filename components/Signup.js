import React, { useRef, useState } from "react";
import { StyleSheet, View, TextInput, Pressable } from "react-native";
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
import {
  SimpleLineIcons,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function Signup({ navigation }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.posts.isLoading);

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordDisplay, setPasswordDisplay] = useState(true);
  const [confirmPasswordDisplay, setConfirmPasswordDisplay] = useState(true);

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
      {isLoading && <Loader />}
      <View style={{ ...globalStyles.loginContainer }}>
        <MyAppText style={globalStyles.heading}>Signup</MyAppText>
        <View style={styles.inputsContainer}>
          <View style={styles.input}>
            <Ionicons name="person-outline" size={20} color="white" />
            <TextInput
              textContentType="name"
              placeholder="Full Name"
              placeholderTextColor={PLACEHOLDER}
              autoCompleteType={"name"}
              keyboardType={"default"}
              style={globalStyles.inputField}
              onChangeText={setFullname}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.input}>
            <MaterialCommunityIcons
              name="email-outline"
              size={20}
              color="white"
            />
            <TextInput
              textContentType="emailAddress"
              placeholder="Email Address"
              placeholderTextColor={PLACEHOLDER}
              autoCompleteType={"email"}
              autoCapitalize="none"
              keyboardType={"email-address"}
              style={globalStyles.inputField}
              onChangeText={setEmail}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              blurOnSubmit={false}
              ref={emailRef}
            />
          </View>
          <View style={styles.input}>
            <SimpleLineIcons name="lock" size={20} color="white" />
            <TextInput
              textContentType="password"
              placeholder="Password"
              secureTextEntry={passwordDisplay}
              autoCompleteType={"password"}
              placeholderTextColor={PLACEHOLDER}
              style={globalStyles.inputField}
              onChangeText={setPassword}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
              blurOnSubmit={false}
              ref={passwordRef}
            />
            <Pressable
              onPress={() => setPasswordDisplay(!passwordDisplay)}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              hitSlop={8}
            >
              {!passwordDisplay ? (
                <FontAwesome name="eye-slash" size={22} color="white" />
              ) : (
                <FontAwesome name="eye" size={22} color="white" />
              )}
            </Pressable>
          </View>
          <View style={styles.input}>
            <SimpleLineIcons name="lock" size={20} color="white" />
            <TextInput
              textContentType="password"
              placeholder="Confirm Password"
              secureTextEntry={confirmPasswordDisplay}
              autoCompleteType={"password"}
              placeholderTextColor={PLACEHOLDER}
              style={globalStyles.inputField}
              onChangeText={setConfirmPassword}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              ref={confirmPasswordRef}
            />
            <Pressable
              onPress={() => setConfirmPasswordDisplay(!confirmPasswordDisplay)}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              hitSlop={8}
            >
              {!confirmPasswordDisplay ? (
                <FontAwesome name="eye-slash" size={22} color="white" />
              ) : (
                <FontAwesome name="eye" size={22} color="white" />
              )}
            </Pressable>
          </View>
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
    minWidth: "80%",
    maxWidth: "80%",
    backgroundColor: TRANSPARENT,
    borderRadius: 10,
    fontFamily: NUNITO_REGULAR,
    color: "white",
    fontSize: 14,
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
});
