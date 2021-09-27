import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { PRIMARY, SECONDARY, TRANSPARENT } from "../constants/colors";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import userCircle from "../assets/user-circle.png";
import MyAppText from "./MyAppText";
import { NUNITO_BOLD } from "../constants/fonts";

export default function DrawerContent(props) {
  const user = useSelector((state) => state.auth.user);

  return (
    <View style={{ flex: 1, paddingBottom: 10, paddingTop: user ? 0 : 30 }}>
      {user && (
        <View style={styles.drawerHeader}>
          {user?.displayImage ? (
            <Image
              source={{ uri: user?.displayImage }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 50,
              }}
            />
          ) : (
            <Image
              source={userCircle}
              style={{ width: 80, height: 80, borderRadius: 50 }}
            />
          )}
          <MyAppText style={styles.userName}>{user?.fullname}</MyAppText>
        </View>
      )}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {user && (
        <DrawerItem
          icon={({ focused, color, size }) => (
            <Ionicons name="exit-outline" size={size} color={color} />
          )}
          label="Signout"
          onPress={() => {}}
          pressColor={TRANSPARENT}
          style={{
            borderBottomRightRadius: 40,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
          labelStyle={{ fontFamily: NUNITO_BOLD, fontSize: 16 }}
          inactiveBackgroundColor={SECONDARY}
          inactiveTintColor={PRIMARY}
          {...props}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    paddingTop: 20,
    paddingBottom: 10,
    borderColor: SECONDARY,
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    marginTop: 20,
    borderRadius: 8,
    color: PRIMARY,
    fontSize: 18,
    fontFamily: NUNITO_BOLD,
    backgroundColor: SECONDARY,
    textAlign: "center",
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
});
