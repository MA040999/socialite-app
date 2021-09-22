import React from 'react'
import { View, Text, Image, TextInput, StyleSheet } from 'react-native'
import icon from '../assets/icon.png'
import { Ionicons } from '@expo/vector-icons';
import { TRANSPARENT } from '../constants/colors';

export default function CreatePost() {
    return (
        <View styles={styles.createPostContainer}>
            <Image source={icon} style={{ width: 30, height: 30 }}/>
            <TextInput placeholder='Search...' placeholderTextColor='rgba(221, 221, 221, 0.32)' style={{flex: 1, color: 'white', fontSize: 20}}/>
            <View>
                <Ionicons name="images" size={24} color="black" />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    createPostContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: "rgb(221, 221, 2)",
        borderRadius: 15,
    },
  });
