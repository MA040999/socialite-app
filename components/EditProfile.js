import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Animated,
  Keyboard,
  Pressable,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  PLACEHOLDER,
  PRIMARY,
  SECONDARY,
  TRANSPARENT,
} from "../constants/colors";
import { updateProfile } from "../redux/auth/authActions";
import Navbar from "./Navbar";
import userCircle from "../assets/user-circle.png";
import Button from "./Button";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import MyAppText from "./MyAppText";
import { NUNITO_BOLD, NUNITO_LIGHT, NUNITO_REGULAR } from "../constants/fonts";
import { globalStyles } from "../styles/globalStyles";
import Loader from "./Loader";

export default function EditProfile({ navigation }) {
  const dispatch = useDispatch();

  const keyboardHeight = useRef(new Animated.Value(0)).current;
  const imageDimension = useRef(new Animated.Value(120)).current;

  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.posts.isLoading);

  const [fullName, setFullName] = useState(user?.fullname);
  const [imageFileData, setImageFileData] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  const validateData = () => {
    if (imageFileData === null && fullName === "") return false;

    return true;
  };

  const handleSubmit = () => {
    if (validateData()) {
      dispatch(
        updateProfile({ fullname: fullName, file: imageBase64 }, navigation)
      );
    }
  };

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Please allow permission in order to upload images.");
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.6,
          base64: true,
        });

        if (!result.cancelled) {
          setImageFileData(result.uri);
          const ext = result.uri.slice(result.uri.length - 3);
          const base64 = `data:image/${ext};base64,` + result.base64;
          setImageBase64(base64);
        }
      }
    }
  };

  const keyboardWillShow = (event) => {
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: 350,
        toValue: event.endCoordinates.height,
        useNativeDriver: false,
      }),
      Animated.timing(imageDimension, {
        duration: 350,
        toValue: 60,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const keyboardWillHide = () => {
    Animated.parallel([
      Animated.timing(keyboardHeight, {
        duration: 350,
        toValue: 0,
        useNativeDriver: false,
      }),
      Animated.timing(imageDimension, {
        duration: 350,
        toValue: 120,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    const keyboardWillShowSub = Keyboard.addListener(
      "keyboardDidShow",
      keyboardWillShow
    );
    const keyboardWillHideSub = Keyboard.addListener(
      "keyboardDidHide",
      keyboardWillHide
    );

    return () => {
      keyboardWillShowSub.remove();
      keyboardWillHideSub.remove();
    };
  }, []);
  return (
    <LinearGradient colors={[PRIMARY, SECONDARY]} style={styles.container}>
      <Navbar navigation={navigation} />
      {isLoading && <Loader />}
      <Animated.View style={globalStyles.loginContainer}>
        <MyAppText style={globalStyles.heading}>Profile</MyAppText>
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 2 }}
        >
          <View>
            {user?.displayImage ? (
              <Animated.Image
                source={
                  imageFileData
                    ? { uri: imageFileData }
                    : { uri: user?.displayImage }
                }
                style={{
                  height: imageDimension,
                  width: imageDimension,
                  borderRadius: 100,
                }}
              />
            ) : (
              <Animated.Image
                source={imageFileData ? { uri: imageFileData } : userCircle}
                style={{
                  height: imageDimension,
                  width: imageDimension,
                  borderRadius: 100,
                }}
              />
            )}
            <Pressable
              onPress={pickImage}
              style={({ pressed }) => [
                { opacity: pressed ? 0.6 : 1 },
                styles.upload,
              ]}
            >
              <Feather name="upload" size={20} color="white" />
            </Pressable>
          </View>
          <TextInput
            textContentType="name"
            placeholder="Full Name"
            placeholderTextColor={PLACEHOLDER}
            autoCompleteType={"name"}
            keyboardType={"default"}
            style={{
              color: "white",
              fontSize: 16,
              ...styles.input,
            }}
            value={fullName}
            onChangeText={setFullName}
          />
          <Button title={"Save"} handlePress={handleSubmit} />
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    padding: 5,
    marginVertical: 30,
    minWidth: "70%",
    maxWidth: "70%",
    backgroundColor: TRANSPARENT,
    borderRadius: 10,
    fontFamily: NUNITO_REGULAR,
  },
  upload: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 50,
    padding: 5,
  },
});
