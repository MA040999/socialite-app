import 'react-native-gesture-handler';
import React from "react";
// import Navigator from './routes/drawer'
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./components/Home";
import Login from "./components/Login";
import PostDetails from './components/PostDetails';

const HomeStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen
        name="Home"
        component={Home}
      />
      <HomeStack.Screen
        name="PostDetails"
        component={PostDetails}

      />
    </HomeStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer >
      <Drawer.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Drawer.Screen  name="HomeStack" component={HomeStackScreen}  />
        <Drawer.Screen name="LoginStack" component={Login}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
