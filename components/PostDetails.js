import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Text,
  RefreshControl,
} from "react-native";
import Post from "./Post";
import { LinearGradient } from "expo-linear-gradient";
import Navbar from "./Navbar";
import { PRIMARY, SECONDARY, TRANSPARENT } from "../constants/colors";
import Comment from "./Comment";
import CreatePost from "./CreatePost";
import {
  changeComment,
  fetchComments,
  getPostById,
  removePost,
} from "../redux/posts/postActions";
import { useDispatch, useSelector } from "react-redux";

export default function PostDetails({ route, navigation }) {
  const dispatch = useDispatch();
  const { id } = route.params;

  // const post = useSelector((state) =>
  //   state.posts.posts.find((post) => post._id === id)
  // );
  const post = useSelector((state) =>
    state.posts.post
      ? state.posts.post
      : state.posts.posts.find((post) => post._id === id)
  );
  const user = useSelector((state) => state.auth.user);
  const commentIds = post?.comments;
  const postComments = useSelector((state) => state.posts.postComments);
  const isLoading = useSelector((state) => state.posts.isLoading);

  const fetchPost = () => {
    dispatch(getPostById(id));
  };

  useEffect(() => {
    fetchPost();
    dispatch(changeComment(true));

    return () => {
      dispatch(removePost());
      dispatch(changeComment(false));
    };
  }, []);

  useEffect(() => {
    commentIds && dispatch(fetchComments(commentIds));
  }, [commentIds]);

  return (
    <LinearGradient
      colors={[PRIMARY, SECONDARY]}
      style={styles.postDetailContainer}
    >
      <Navbar navigation={navigation} />

      <FlatList
        data={postComments}
        refreshing={isLoading}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={PRIMARY}
            colors={[SECONDARY]}
            onRefresh={fetchPost}
            refreshing={isLoading}
          />
        }
        ListHeaderComponent={
          post && (
            <Post
              id={id}
              navigation={navigation}
              content={post.content}
              creator={post.creator}
              name={post.name}
              displayImage={post.displayImage}
              createdAt={post.createdAt}
              user={user}
              comments={post.comments}
              likeCount={post.likeCount}
              images={post.images}
            />
          )
        }
        ListEmptyComponent={
          postComments && (
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                borderColor: SECONDARY,
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Text style={{ color: "white" }}>Be the first to comment!</Text>
            </View>
          )
        }
        ListHeaderComponentStyle={{ marginBottom: 20 }}
        ListFooterComponent={<View style={{ marginBottom: 20 }}></View>}
        style={{ width: Dimensions.get("window").width }}
        keyExtractor={(comment) => comment._id}
        renderItem={({ item }) => {
          return <Comment key={item._id} comment={item} />;
        }}
      />

      <View style={{ height: 100, justifyContent: "center" }}>
        {user && <CreatePost isComment={true} />}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  postDetailContainer: {
    width: "100%",
    height: "100%",
  },
});
