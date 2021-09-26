import "react-native-gesture-handler";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home";
import Login from "./components/Login";
import PostDetails from "./components/PostDetails";
import Signup from "./components/Signup";
import { PRIMARY, SECONDARY } from "./constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { verifyRefreshToken } from "./redux/auth/authActions";
import * as SecureStore from "expo-secure-store";
import { AppState, View } from "react-native";

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

export default function AppInner() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [appIsReady, setAppIsReady] = useState(false);

  const getNewToken = async () => {
    let token = await SecureStore.getItemAsync("__refresh__token");
    if (token) {
      dispatch(verifyRefreshToken(token));
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    getNewToken();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        getNewToken();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
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
          {!user && <Drawer.Screen name="Login" component={Login} />}
          {!user && <Drawer.Screen name="Signup" component={Signup} />}
        </Drawer.Navigator>
        <StatusBar style="light" backgroundColor={PRIMARY} />
      </NavigationContainer>
      <View onLayout={onLayoutRootView}></View>
    </>
  );
}
