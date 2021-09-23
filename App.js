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
          drawerActiveBackgroundColor: "#211663",
          drawerInactiveBackgroundColor: "rgba(0,0,0,0.15)",
          drawerActiveTintColor: "white",
          drawerInactiveTintColor: "white",
          drawerStyle: {
            marginTop: 25,
            paddingTop: 20,
            backgroundColor: "#0cae88",
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
      </Drawer.Navigator>
      <StatusBar style="light" backgroundColor="#211663" />
    </NavigationContainer>
  );
}
