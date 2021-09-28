import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Navbar from "./Navbar";
import {
  PLACEHOLDER,
  PRIMARY,
  SECONDARY,
  TRANSPARENT,
} from "../constants/colors";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { addNotificationMsg } from "../redux/posts/postActions";
import { validateEmail } from "../common/common";
import { login } from "../redux/auth/authActions";
import MyAppText from "./MyAppText";
import { globalStyles } from "../styles/globalStyles";
import { NUNITO_LIGHT, NUNITO_REGULAR } from "../constants/fonts";
import Loader from "./Loader";
import {
  SimpleLineIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.posts.isLoading);
  const passwordRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordDisplay, setPasswordDisplay] = useState(true);

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
      {isLoading && <Loader />}
      <View style={{ ...globalStyles.loginContainer }}>
        <MyAppText style={globalStyles.heading}>Login</MyAppText>
        <View style={styles.inputsContainer}>
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
              returnKeyType="done"
              ref={passwordRef}
              onSubmitEditing={handleSubmit}
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
  inputsContainer: {
    justifyContent: "space-around",
  },
  input: {
    padding: 5,
    marginVertical: 10,
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
