import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View, Text, Modal, StyleSheet } from 'react-native'
import { TRANSPARENT } from '../constants/colors'

export default function Confirmation({isOpen, setIsOpen}) {

    const handleClose = ()=>{
        setIsOpen(!isOpen)
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpen}
        >
          <View style={styles.modalContainer}>
              <View style={styles.modal}>
                <Text style={{color: 'white'}}>Are you sure you want to delete?</Text>
                <View style={styles.buttonContainer}>
                    <LinearGradient colors={["#0cae88", "#211663" ]} onTouchEnd={handleClose} style={styles.button}>
                        <Text style={styles.buttonText}>Yes</Text>
                    </LinearGradient>
                    <LinearGradient colors={["#0cae88", "#211663" ]} onTouchEnd={handleClose} style={styles.button}>
                        <Text style={styles.buttonText}>No</Text>
                    </LinearGradient> 
                </View>
              </View>
          </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.9)'
      },
    modal: {
        backgroundColor: TRANSPARENT,
        width: '90%',
        height: '20%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonContainer: {
          marginTop: 20,
        flexDirection: 'row'   
      },
    button: {
        elevation: 5,
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 40,
        marginHorizontal: 10,
        textTransform: 'uppercase'
        },
    buttonText: {
        color: 'white'
    },
})
