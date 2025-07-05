import React from "react";
import "./PostCard.css";

export default function PostCard({ post }) {
  if (!post) return null;     // post가 아예 없으면 안전 종료

  return (
    <div className="post-card">
      <div className="category">{post.category}</div>

      <div className="header">
        <div className="user">
          <p className="nickname">{post.nickname}</p>
          <p className="username">@{post.username}</p>
        </div>
        <p className="time">{post.time}</p>
      </div>

      <p className="content">{post.content}</p>

      <div className="icons">
        <div className="icon">💬 {post.comments}</div>
        <div className="icon">🔁 {post.shares}</div>
        <div className="icon">🔖 {post.bookmarks}</div>
        <div className="icon">❤️ {post.likes}</div>
      </div>
    </div>
  );
}
