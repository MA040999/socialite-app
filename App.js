import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
// import Navigator from './routes/drawer'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import Login from "./components/Login";
import PostDetails from "./components/PostDetails";
import Signup from "./components/Signup";
import { PRIMARY, SECONDARY } from "./constants/colors";

const HomeStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={Home} />
      <HomeStack.Screen name="PostDetails" component={PostDetails} />
    </HomeStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: SECONDARY,
          drawerInactiveBackgroundColor: "rgba(255,255,255, 0.1)",
          drawerActiveTintColor: PRIMARY,
          drawerInactiveTintColor: "white",
          drawerStyle: {
            marginTop: 24,
            paddingTop: 20,
            backgroundColor: PRIMARY,
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
            elevation: 10,
          },
          drawerItemStyle: {
            borderRadius: 15,
            padding: 5,
          },
        }}
      >
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Signup" component={Signup} />
      </Drawer.Navigator>
      <StatusBar style="light" backgroundColor={PRIMARY} />
    </NavigationContainer>
  );
}
