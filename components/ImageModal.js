import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { PRIMARY, SECONDARY, TRANSPARENT } from "../constants/colors";
import { Entypo } from "@expo/vector-icons";

export default function ImageModal({
  selectedImage,
  selectedImageArray,
  isModalActive,
  setIsModalActive,
  imageIndex,
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={isModalActive}>
      <View style={styles.modalContainer}>
        <Entypo
          name="cross"
          size={26}
          color={PRIMARY}
          onPress={() => setIsModalActive(false)}
          style={styles.cancelBtn}
        />
        <FlatList
          data={selectedImageArray}
          keyExtractor={(item) => item}
          pagingEnabled
          horizontal
          initialScrollIndex={imageIndex}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return <Image source={{ uri: item }} style={styles.image} />;
          }}
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
    backgroundColor: "rgba(0,0,0,0.95)",
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
  image: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    resizeMode: "contain",
    borderRadius: 5,
  },
  cancelBtn: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: SECONDARY,
    borderRadius: 50,
    zIndex: 100,
  },
});
