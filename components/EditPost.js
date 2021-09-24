import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { PRIMARY, SECONDARY, TRANSPARENT } from "../constants/colors";
import Button from "./Button";
import CreatePost from "./CreatePost";

export default function EditPost({ isEditOpen, setIsEditOpen }) {
  const handleClose = () => {
    setIsEditOpen(!isEditOpen);
  };
  return (
    <Modal animationType="slide" transparent={true} visible={isEditOpen}>
      <View style={styles.modalContainer}>
        <CreatePost />
        <Button title={"Cancel"} handlePress={handleClose} />
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
  },
  button: {
    elevation: 5,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 40,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    textTransform: "uppercase",
  },
});
