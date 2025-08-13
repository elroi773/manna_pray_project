// src/components/PostList.jsx
import React from "react";
import PostCard from "./PostCard";
import "./PostList.css";

export default function PostList({ posts = [] }) {
  if (!Array.isArray(posts)) {
    console.warn("PostList가 받은 posts 값이 배열이 아님:", posts);
    return null;
  }

  return (
    <div className = "post-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
