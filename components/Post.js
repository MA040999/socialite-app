import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Modal, Pressable } from "react-native";
import { SECONDARY, TRANSPARENT } from "../constants/colors";
import userCircle from "../assets/user-circle.png";
import {
  Feather,
  Ionicons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import Confirmation from "./Confirmation";
import EditPost from "./EditPost";
import moment from "moment";
import {
  changeComment,
  changeConfirmationStatus,
  changeEditStatus,
  changeSelectedPost,
  likePost,
} from "../redux/posts/postActions";
import { useDispatch } from "react-redux";
import MyAppText from "./MyAppText";
import { NUNITO_BOLD, NUNITO_SEMIBOLD } from "../constants/fonts";
import ImageModal from "./ImageModal";

export default function Post(props) {
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedImageArray, setSelectedImageArray] = useState(null);
  const dispatch = useDispatch();

  const {
    navigation,
    isComment,
    content,
    createdAt,
    creator,
    displayImage,
    name,
    likeCount,
    comments,
    images,
    id,
    user,
  } = props;

  const [like, setLike] = useState(likeCount?.includes(user?.id));
  const [likeLength, setLikeLength] = useState(likeCount?.length);

  const handleLikeClick = () => {
    if (user) {
      setLike(!like);
      setLikeLength((prev) => (like ? prev - 1 : prev + 1));
      dispatch(likePost(id));
    } else {
      dispatch(likePost(id));
    }
  };

  return (
    <>
      <ImageModal
        selectedImage={selectedImage}
        selectedImageArray={selectedImageArray}
        isModalActive={isModalActive}
        setIsModalActive={setIsModalActive}
        imageIndex={imageIndex}
      />
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          {displayImage ? (
            <Image
              source={{ uri: displayImage }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                marginHorizontal: 5,
              }}
            />
          ) : (
            <Image
              source={userCircle}
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                marginHorizontal: 5,
              }}
            />
          )}
          <View style={styles.postHeaderUserName}>
            <MyAppText
              style={{
                color: "white",
                fontFamily: NUNITO_SEMIBOLD,
                fontSize: 15,
              }}
            >
              {name}
            </MyAppText>
            <MyAppText style={{ fontSize: 10, color: "white" }}>
              {moment(createdAt).fromNow()}
            </MyAppText>
          </View>
          {!isComment && user?.id === creator && (
            <View style={styles.iconsContainer}>
              <Pressable
                onPress={() => {
                  dispatch(changeSelectedPost(id));
                  dispatch(changeEditStatus());
                }}
                hitSlop={8}
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              >
                <Feather
                  style={{ paddingHorizontal: 15 }}
                  name="edit"
                  size={20}
                  color="white"
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  dispatch(changeSelectedPost(id));
                  dispatch(changeConfirmationStatus());
                }}
                hitSlop={8}
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              >
                <Ionicons name="ios-trash" size={20} color="white" />
              </Pressable>
            </View>
          )}
        </View>
        <View style={styles.postBody}>
          <MyAppText
            style={{
              color: "white",
              fontFamily: NUNITO_SEMIBOLD,
              fontSize: 14,
            }}
          >
            {content}
          </MyAppText>
        </View>
        {!isComment && images?.length > 0 && (
          <View style={styles.postImagesContainer}>
            {images.map((image, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    setSelectedImage(image);
                    setImageIndex(index);
                    setSelectedImageArray(images);
                    setIsModalActive(true);
                  }}
                  hitSlop={8}
                  style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
                >
                  <Image source={{ uri: image }} style={styles.image} />
                </Pressable>
              );
            })}
          </View>
        )}
        {!isComment && (
          <View
            style={{ ...styles.iconsContainer, ...styles.likeCommentContainer }}
          >
            {like ? (
              <Pressable
                onPress={handleLikeClick}
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                hitSlop={8}
              >
                <AntDesign name="heart" size={20} color="white" />
              </Pressable>
            ) : (
              <Pressable
                onPress={handleLikeClick}
                style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
                hitSlop={8}
              >
                <AntDesign name="hearto" size={20} color="white" />
              </Pressable>
            )}
            <MyAppText
              style={{ color: "white", marginLeft: 5, fontFamily: NUNITO_BOLD }}
            >
              {likeLength}
            </MyAppText>
            <Pressable
              onPress={() => {
                dispatch(changeSelectedPost(id));
                navigation && navigation.navigate("PostDetails", { id });
              }}
              hitSlop={8}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <MaterialIcons
                style={{ paddingLeft: 15 }}
                name="comment"
                size={20}
                color="white"
              />
            </Pressable>

            <MyAppText
              style={{ color: "white", marginLeft: 5, fontFamily: NUNITO_BOLD }}
            >
              {comments.length}
            </MyAppText>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: TRANSPARENT,
    borderRadius: 25,
    paddingLeft: 5,
    paddingVertical: 8,
    paddingRight: 15,
    marginVertical: 8,
    marginHorizontal: 10,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  postHeaderUserName: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    paddingLeft: 5,
  },
  postBody: {
    marginVertical: 20,
    paddingLeft: 55,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  postImagesContainer: {
    marginBottom: 20,
    marginTop: 10,
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingHorizontal: 15,
  },
  likeCommentContainer: {
    paddingLeft: 55,
    marginVertical: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginVertical: 10,
  },
});
