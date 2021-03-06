import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { Feather, AntDesign, Entypo } from "@expo/vector-icons";
import logo from "../assets/favicon.png";
import { PLACEHOLDER, TRANSPARENT } from "../constants/colors";
import { NUNITO_REGULAR } from "../constants/fonts";
import SearchBar from "./SearchBar";

export default function Navbar({ navigation }) {
  const [canGoBack, setCanGoBack] = useState(navigation.canGoBack());

  useEffect(() => {
    setCanGoBack(navigation.canGoBack());
  }, [navigation]);
  return (
    <View style={styles.container}>
      {canGoBack ? (
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.4 : 1 }]}
          hitSlop={15}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </Pressable>
      ) : (
        <Image source={logo} style={{ width: 50, height: 50 }} />
      )}
      <SearchBar navigation={navigation}/>
      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.4 : 1 },
          styles.menuContainer,
        ]}
        hitSlop={10}
        onPress={() => navigation.openDrawer()}
      >
        <Entypo name="menu" size={35} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 65,
    paddingHorizontal: 20,
    width: "100%",
    paddingTop: 45,
    marginBottom: 25,
  },
  menuContainer: {
    backgroundColor: TRANSPARENT,
    borderRadius: 8,
  },
  searchBar: {
    flex: 0.65,
    color: "white",
    paddingHorizontal: 8,
    height: 35,
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "row",
  },
});
