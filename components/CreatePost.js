import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Platform,
  ImageStore,
  Pressable,
} from "react-native";
import userCircle from "../assets/user-circle.png";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { PLACEHOLDER, PRIMARY, TRANSPARENT } from "../constants/colors";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  changeEditStatus,
  comment,
  createPost,
  updatePost,
} from "../redux/posts/postActions";

export default function CreatePost({ isComment }) {
  const dispatch = useDispatch();

  const [image, setImage] = useState([]);
  const [imageBase64, setImageBase64] = useState([]);
  const [postInput, setPostInput] = useState("");

  const user = useSelector((state) => state.auth.user);
  const isEdit = useSelector((state) => state.posts.isEditActive);
  // const isComment = useSelector((state) => state.posts.isCommentActive);
  const selectedPost = useSelector((state) => state.posts.selectedPost);
  const postData = useSelector((state) => {
    if (state.posts.post) {
      return state.posts.post;
    } else {
      return state.posts.posts.find((post) => post._id === selectedPost);
    }
  });

  const clearInputs = () => {
    setPostInput("");
    setImageBase64([]);
    setImage([]);
  };

  const validateData = () => {
    if (isComment) {
      if (postInput === "") return false;
    } else {
      if (image.length === 0 && postInput === "") return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateData()) {
      if (isEdit) {
        dispatch(
          updatePost({ content: postInput, file: imageBase64 }, selectedPost)
        );
        dispatch(changeEditStatus());
      } else if (isComment) {
        dispatch(comment({ content: postInput }, selectedPost));
        clearInputs();
      } else {
        dispatch(createPost({ content: postInput, file: imageBase64 }));
        clearInputs();
      }
    }
  };

  const handleRemoveImage = (index) => {
    setImage((oldImages) => {
      const newImages = [...oldImages];
      newImages.splice(index, 1);
      return newImages;
    });
    setImageBase64((oldImages) => {
      const newImages = [...oldImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Please allow permission in order to upload images.");
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 0.6,
          allowsMultipleSelection: true,
          base64: true,
        });

        if (!result.cancelled) {
          setImage([...image, result.uri]);
          const ext = result.uri.slice(result.uri.length - 3);
          const base64 = `data:image/${ext};base64,` + result.base64;
          setImageBase64([...imageBase64, base64]);
        }
      }
    }
  };

  useEffect(() => {
    if (isEdit) {
      setPostInput(postData.content);
      setImage(postData.images);
      setImageBase64(postData.images);
    }
  }, []);

  return (
    <View
      style={
        isComment
          ? { ...styles.createPostContainer, ...styles.commentCreator }
          : { ...styles.createPostContainer }
      }
    >
      <View style={styles.createPostMain}>
        {user?.displayImage ? (
          <Image
            source={{ uri: user?.displayImage }}
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
            style={{ width: 50, height: 50, borderRadius: 50 }}
          />
        )}
        <TextInput
          placeholder={isComment ? "Leave a comment..." : "What's on your mind?"}
          placeholderTextColor={PLACEHOLDER}
          style={{
            flex: 1,
            color: "white",
            fontSize: 14,
            textAlignVertical: "center",
          }}
          multiline={true}
          value={postInput}
          onChangeText={setPostInput}
        />

        <View style={styles.iconsContainer}>
          {!isComment && (
            <Pressable
              onPress={pickImage}
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            >
              <Ionicons
                style={{ paddingRight: 15 }}
                name="images"
                size={20}
                color="white"
              />
            </Pressable>
          )}
          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          >
            <FontAwesome name="send" size={20} color="white" />
          </Pressable>
        </View>
      </View>
      {image.length > 0 && (
        <View style={styles.imagesContainer}>
          {image.map((img, index) => (
            <View key={img}>
              <Pressable
                style={({ pressed }) => [
                  { opacity: pressed ? 0.6 : 1 },
                  styles.cancelImage,
                ]}
                onPress={() => handleRemoveImage(index)}
              >
                <Entypo name="cross" size={22} color="white" />
              </Pressable>
              <Image source={{ uri: img }} style={styles.image} />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  createPostContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: TRANSPARENT,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 8,
    marginBottom: 40,
    marginTop: -30,
  },
  iconsContainer: {
    flexDirection: "row",
    paddingLeft: 15,
  },
  commentCreator: {
    marginBottom: 0,
    marginTop: 0,
    backgroundColor: PRIMARY,
  },
  createPostMain: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 15,
  },
  imagesContainer: {
    marginTop: 20,
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingHorizontal: 15,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginVertical: 10,
  },
  cancelImage: {
    position: "absolute",
    right: -7,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 50,
  },
});
