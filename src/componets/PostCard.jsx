import React from "react";
import { useNavigate } from "react-router-dom";
import "./PostCard.css";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="post-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="top-row">
        <span className="badge">{post.category}</span>
        <span className="time">{post.time}</span>
      </div>

      <div className="user-info">
        <div className="profile-image" />
        <div className="user-text">
          <p className="nickname">{post.nickname}</p>
          <p className="username">{post.username}</p>
        </div>
      </div>

      <p className="content">{post.content}</p>

      <div className="icons">
        <div className="icon comment">💬 {post.comments}</div>
        <div className="icon share">🔁 {post.shares}</div>
        <div className="icon report">🚩 {post.reports}</div>
        <div className="icon like">❤️ {post.likes}</div>
      </div>
    </div>
  );
}
