import React, { useEffect, useState } from "react";
import { View, FlatList, Dimensions, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { PRIMARY, SECONDARY } from "../constants/colors";
import { getPosts, removePosts } from "../redux/posts/postActions";
import Post from "./Post";

export default function Posts({ navigation }) {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const user = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.posts.isLoading);

  const fetchPosts = () => {
    dispatch(removePosts());
    dispatch(getPosts());
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View>
      {posts && (
        <FlatList
          data={posts}
          refreshing={isLoading}
          refreshControl={
            <RefreshControl
              progressBackgroundColor={PRIMARY}
              colors={[SECONDARY]}
              onRefresh={fetchPosts}
              refreshing={isLoading}
            />
          }
          ListFooterComponent={
            <View style={{ marginBottom: user ? 100 : 50 }}></View>
          }
          style={{
            width: Dimensions.get("window").width,
            marginTop: user ? 0 : -30,
          }}
          keyExtractor={(post) => post._id}
          renderItem={({ item }) => {
            return (
              <Post
                navigation={navigation}
                id={item._id}
                user={user}
                creator={item.creator}
                name={item.name}
                displayImage={item.displayImage}
                content={item.content}
                createdAt={item.createdAt}
                likeCount={item.likeCount}
                comments={item.comments}
                images={item.images}
              />
            );
          }}
        />
      )}
    </View>
  );
}
