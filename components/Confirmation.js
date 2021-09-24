import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { PRIMARY, SECONDARY, TRANSPARENT } from "../constants/colors";
import Button from "./Button";

export default function Confirmation({ isOpen, setIsOpen }) {
  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={{ color: "white" }}>
            Are you sure you want to delete?
          </Text>
          <View style={styles.buttonContainer}>
            <Button title={"Yes"} handlePress={handleClose} />
            <Button title={"No"} handlePress={handleClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  modal: {
    backgroundColor: TRANSPARENT,
    width: "90%",
    height: "20%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
  },
});