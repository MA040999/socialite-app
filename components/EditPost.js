import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { PRIMARY, SECONDARY, TRANSPARENT } from "../constants/colors";
import { changeEditStatus } from "../redux/posts/postActions";
import Button from "./Button";
import CreatePost from "./CreatePost";

export default function EditPost() {
  const dispatch = useDispatch();

  const isEdit = useSelector((state) => state.posts.isEditActive);

  return (
    <Modal animationType="slide" transparent={true} visible={isEdit}>
      <View style={styles.modalContainer}>
        <CreatePost />
        <Button
          title={"Cancel"}
          handlePress={() => dispatch(changeEditStatus())}
        />
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
