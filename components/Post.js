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
import { changeSelectedPost, likePost } from "../redux/posts/postActions";
import { useDispatch } from "react-redux";

export default function Post(props) {
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

  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
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
    <View style={styles.postContainer}>
      {!isComment && (
        <Confirmation
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          navigation={navigation}
        />
      )}
      {!isComment && (
        <EditPost isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} />
      )}
      <View style={styles.postHeader}>
        {displayImage ? (
          <Image
            source={{ uri: displayImage }}
            style={{ width: 40, height: 40, borderRadius: 50 }}
          />
        ) : (
          <Image
            source={userCircle}
            style={{ width: 40, height: 40, borderRadius: 50 }}
          />
        )}
        <View style={styles.postHeaderUserName}>
          <Text style={{ color: "white" }}>{name}</Text>
          <Text style={{ fontSize: 10, color: "white" }}>
            {moment(createdAt).fromNow()}
          </Text>
        </View>
        {(!isComment || user?.id === creator) && (
          <View style={styles.iconsContainer}>
            <Pressable
              onPress={() => {
                dispatch(changeSelectedPost(id));
                setIsEditOpen(!isEditOpen);
              }}
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
                setIsOpen(!isOpen);
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <Ionicons name="ios-trash" size={20} color="white" />
            </Pressable>
          </View>
        )}
      </View>
      <View style={styles.postBody}>
        <Text style={{ color: "white" }}>{content}</Text>
      </View>
      {!isComment && images?.length > 0 && (
        <View style={styles.postImagesContainer}>
          {images.map((image, index) => {
            return (
              <Image key={index} source={{ uri: image }} style={styles.image} />
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
            >
              <AntDesign name="heart" size={20} color="white" />
            </Pressable>
          ) : (
            <Pressable
              onPress={handleLikeClick}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <AntDesign name="hearto" size={20} color="white" />
            </Pressable>
          )}
          <Text style={{ color: "white", marginLeft: 5 }}>{likeLength}</Text>
          <Pressable
            onPress={() =>
              navigation && navigation.navigate("PostDetails", { id })
            }
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <MaterialIcons
              style={{ paddingLeft: 15 }}
              name="comment"
              size={20}
              color="white"
            />
          </Pressable>

          <Text style={{ color: "white", marginLeft: 5 }}>
            {comments.length}
          </Text>
        </View>
      )}
    </View>
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
    paddingLeft: 45,
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
    paddingLeft: 45,
    marginVertical: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginVertical: 10,
  },
});
