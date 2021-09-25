import React, { useEffect } from "react";
import { View, FlatList, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/posts/postActions";
import Post from "./Post";

export default function Posts({ navigation }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getPosts());

    // eslint-disable-next-line
  }, []);
  return (
    <View>
      {posts && (
        <FlatList
          data={posts}
          ListFooterComponent={<View style={{ marginBottom: 100 }}></View>}
          style={{ width: Dimensions.get("window").width }}
          keyExtractor={(post) => post._id}
          renderItem={(post) => {
            return (
              <Post
                navigation={navigation}
                id={post._id}
                user={user}
                creator={post.creator}
                name={post.name}
                displayImage={post.displayImage}
                content={post.content}
                createdAt={post.createdAt}
                likeCount={post.likeCount}
                comments={post.comments}
                images={post.images}
              />
            );
          }}
        />
      )}
    </View>
  );
}
