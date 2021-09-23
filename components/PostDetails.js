import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Post from './Post'
import { LinearGradient } from "expo-linear-gradient";
import Navbar from './Navbar';

export default function PostDetails({navigation}) {
    return (
        <LinearGradient colors={["#211663", "#0cae88"]} style={styles.postDetailContainer}>
            <Navbar navigation={navigation}/>
            <Post/>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    postDetailContainer: {
        width: '100%',
        height: '100%'
    }
})