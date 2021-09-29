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
import { AppState, Modal, View } from "react-native";
import EditProfile from "./components/EditProfile";
import DrawerContent from "./components/DrawerContent";
import { AntDesign, FontAwesome5, Ionicons, Feather } from "@expo/vector-icons";
import * as Font from "expo-font";
import { NUNITO_BOLD } from "./constants/fonts";
import Notification from "./components/Notification";
import LottieView from 'lottie-react-native';
import { LinearGradient } from "expo-linear-gradient";

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
  const [fontLoaded, setFontLoaded] = useState(false);
  const [hasAnimationPlayedOnce, setHasAnimationPlayedOnce] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const loadFonts = async () => {
    await Font.loadAsync({
      "Nunito-Bold": require("./assets/fonts/Nunito-Bold.ttf"),
      "Nunito-Light": require("./assets/fonts/Nunito-Light.ttf"),
      "Nunito-SemiBold": require("./assets/fonts/Nunito-SemiBold.ttf"),
      "Nunito-Regular": require("./assets/fonts/Nunito-Regular.ttf"),
    });
    setFontLoaded(true);
  };

  const getNewToken = async () => {
    let token = await SecureStore.getItemAsync("__refresh__token");
    if (token) {
      dispatch(verifyRefreshToken(token));
      setTimeout(() => {
        getNewToken();
      }, 600000 - 1000); //10 minutes - 1 second
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        loadFonts();
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
      setIsModalVisible(true)
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
    });

    return () => {
      subscription?.remove();
    };
  }, []);

  if (!appIsReady || !fontLoaded) {
    return null;
  }

  const handleAnimationFinish = () => {
    setHasAnimationPlayedOnce(true)
    setIsModalVisible(false)
  }

  return (
    <>
      <Modal visible={isModalVisible} animationType="fade">
    <LinearGradient colors={[PRIMARY, SECONDARY]} style={{flex: 1, width: '100%', height: "100%"}}>
      <LottieView
        source={require('./assets/animation.json')}
        loop={false}
        autoPlay
        onAnimationFinish={handleAnimationFinish}
       />
    </LinearGradient>

    </Modal>
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
              // paddingTop: 20,
              backgroundColor: PRIMARY,
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50,
              overflow: "hidden",

              elevation: 10,
            },
            drawerItemStyle: {
              borderRadius: 15,
            },
            drawerLabelStyle: {
              fontFamily: NUNITO_BOLD,
              fontSize: 16,
            },
          }}
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              drawerIcon: ({ focused, color, size }) => (
                <AntDesign name="home" size={size} color={color} />
              ),
            }}
          />
          {!user && (
            <Drawer.Screen
              name="Login"
              component={Login}
              options={{
                drawerIcon: ({ focused, color, size }) => (
                  <Ionicons name="log-in-outline" size={size} color={color} />
                ),
              }}
            />
          )}
          {!user && (
            <Drawer.Screen
              name="Signup"
              component={Signup}
              options={{
                drawerIcon: ({ focused, color, size }) => (
                  <Feather name="user-plus" size={size} color={color} />
                ),
              }}
            />
          )}
          {user && (
            <Drawer.Screen
              name="Profile"
              component={EditProfile}
              options={{
                drawerIcon: ({ focused, color, size }) => (
                  <FontAwesome5 name="user-edit" size={size} color={color} />
                ),
              }}
            />
          )}
        </Drawer.Navigator>
        <Notification/>

        <StatusBar style="light" backgroundColor={PRIMARY} />
      </NavigationContainer>
      <View onLayout={onLayoutRootView}></View>
    </>
  );
}
