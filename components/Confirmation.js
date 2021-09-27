import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { PRIMARY, SECONDARY, TRANSPARENT } from "../constants/colors";
import {
  changeConfirmationStatus,
  deletePost,
} from "../redux/posts/postActions";
import Button from "./Button";
import MyAppText from "./MyAppText";

export default function Confirmation({ navigation }) {
  const dispatch = useDispatch();

  const selectedPost = useSelector((state) => state.posts.selectedPost);
  const isCommentActive = useSelector((state) => state.posts.isCommentActive);
  const confirmationStatus = useSelector(
    (state) => state.posts.isConfirmationActive
  );

  const handleNoClick = () => {
    dispatch(changeConfirmationStatus());
  };

  const handleYesClick = () => {
    if (isCommentActive) {
      dispatch(deletePost(selectedPost, navigation));
    } else {
      dispatch(deletePost(selectedPost));
    }
    dispatch(changeConfirmationStatus());
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={confirmationStatus}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <MyAppText style={{ color: "white" }}>
            Are you sure you want to delete?
          </MyAppText>
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
