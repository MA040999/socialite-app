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
  }, []);
  return (
    <View>
      {posts && (
        <FlatList
          data={posts}
          ListFooterComponent={<View style={{ marginBottom: 100 }}></View>}
          style={{ width: Dimensions.get("window").width }}
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
