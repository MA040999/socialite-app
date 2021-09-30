import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { PRIMARY, SECONDARY } from '../constants/colors'
import LottieView from 'lottie-react-native';

export default function Splash({ navigation }) {

    return (
        <LinearGradient colors={[PRIMARY, SECONDARY]} style={{flex: 1, width: '100%', height: "100%"}}>
          <LottieView
            source={require('../assets/animation.json')}
            loop={false}
            autoPlay
            onAnimationFinish={()=>navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }]
           })}
          />
        </LinearGradient>
    )
}
