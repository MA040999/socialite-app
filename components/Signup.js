import React from 'react'
import { StyleSheet, Text, View, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Navbar from './Navbar';
import { TRANSPARENT } from '../constants/colors';

export default function Signup({navigation}) {
    return (
        <LinearGradient colors={["#211663", "#0cae88"]} style={styles.container}>
            <Navbar navigation={navigation} />
            <View style={{ ...styles.postScreen }}>
                <Text style={styles.heading}>SIGNUP</Text>
                <View style={styles.inputsContainer}>
                    <TextInput
                        textContentType='name'
                        placeholder="Full Name"
                        placeholderTextColor="rgba(221, 221, 221, 0.5)"
                        autoCompleteType={'name'}
                        keyboardType={'default'}
                        style={{ color: "white", fontSize: 14, ...styles.input }}
                    />
                    <TextInput
                        textContentType='emailAddress'
                        placeholder="Email Address"
                        placeholderTextColor="rgba(221, 221, 221, 0.5)"
                        autoCompleteType={'email'}
                        keyboardType={'email-address'}
                        style={{ color: "white", fontSize: 14, ...styles.input }}
                    />
                    <TextInput
                        textContentType='password'
                        placeholder="Password"
                        secureTextEntry={true}
                        autoCompleteType={'password'}
                        placeholderTextColor="rgba(221, 221, 221, 0.5)"
                        style={{ color: "white", fontSize: 14, ...styles.input }}
                    />
                    <TextInput
                        textContentType='password'
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        autoCompleteType={'password'}
                        placeholderTextColor="rgba(221, 221, 221, 0.5)"
                        style={{ color: "white", fontSize: 14, ...styles.input }}
                    />
                </View>
                <LinearGradient colors={["#0cae88", "#211663" ]} style={styles.button}>
                    <Text style={styles.buttonText}>SIGNUP</Text>
                 </LinearGradient>

            </View>
         </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,

    },
    postScreen: {
        backgroundColor: TRANSPARENT,
        borderRadius: 20,
        flex: 1,
        alignSelf: 'center',
        marginVertical: 30,
        paddingVertical: 10,
        width: "85%",
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    heading: {
        fontSize: 20,
        color: 'white'
    },
    button: {
        elevation: 5,
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 40,
        textTransform: 'uppercase'
    },
    buttonText: {
        color: 'white'
    },
    inputsContainer: {
        justifyContent: 'space-around',
    },
    input: {
        padding: 5,
        marginVertical: 5,
        minWidth: '70%',
        backgroundColor: TRANSPARENT,
        borderRadius: 10
    }
  });
  
