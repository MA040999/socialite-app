import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { PRIMARY, SECONDARY } from '../constants/colors'
import {useSelector, useDispatch} from 'react-redux'
import { NUNITO_BOLD } from '../constants/fonts';
import MyAppText from './MyAppText';
import { removeNotificationMsg } from '../redux/posts/postActions';

export default function Notification() {
    const dispatch = useDispatch()
    const translateAnim = useRef(new Animated.Value(-150)).current;

  const notificationMsg = useSelector((state) => state.posts.notificationMsg);

  const moveIn = () => {
    Animated.timing(translateAnim, {
      toValue: 90,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const moveOut = () => {
    Animated.timing(translateAnim, {
      toValue: -150,
      useNativeDriver: false,
      duration: 500
      
    }).start();
  };

  useEffect(() => {
      if(notificationMsg){
          moveIn()
          setTimeout(()=>{
            moveOut()

            setTimeout(()=>{
                dispatch(removeNotificationMsg())
                }, 700)
            }, 3000)
      }   
  }, [notificationMsg])

    return (
        notificationMsg && 
            <Animated.View style={[styles.notificationContainer, {top: translateAnim}]}>
                <MyAppText style={{textAlign: 'center', textTransform: 'uppercase', color: PRIMARY, fontFamily: NUNITO_BOLD, fontSize: 13}} >{notificationMsg}</MyAppText>
            </Animated.View>
    )
}

const styles = StyleSheet.create({
    notificationContainer: {
        position: 'absolute',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 30,
        zIndex: 100,
        elevation: 8,
        minWidth: '40%',
        maxWidth: "70%",
        backgroundColor: SECONDARY
    },
})