import React from "react";
import { View, Text } from "react-native";
import Post from "./Post";

export default function Comment({ comment }) {
  return (
    <View style={{ width: "85%", alignSelf: "center" }}>
      <Post
        isComment={true}
        id={comment._id}
        content={comment.content}
        creator={comment.creator}
        name={comment.name}
        displayImage={comment.displayImage}
        createdAt={comment.createdAt}
      />
    </View>
  );
}
