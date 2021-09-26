import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { PRIMARY, SECONDARY, TRANSPARENT } from "../constants/colors";
import { deletePost } from "../redux/posts/postActions";
import Button from "./Button";

export default function Confirmation({ isOpen, setIsOpen, navigation }) {
  const dispatch = useDispatch();
  const selectedPost = useSelector((state) => state.posts.selectedPost);
  const isCommentActive = useSelector((state) => state.posts.isCommentActive);

  const handleNoClick = () => {
    setIsOpen(!isOpen);
  };

  const handleYesClick = () => {
    if (isCommentActive) {
      dispatch(deletePost(selectedPost, navigation));
    } else {
      dispatch(deletePost(selectedPost));
    }
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
            <Button title={"Yes"} handlePress={handleYesClick} />
            <Button title={"No"} handlePress={handleNoClick} />
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
