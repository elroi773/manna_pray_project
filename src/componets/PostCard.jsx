// src/pages/PostCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./PostCard.css";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  return (
    <div
      className="post-card"
      onClick={() => navigate(`/post/${post.id}`)}
      style={{ cursor: "pointer" }}
    >
      <h3>{post.title}</h3>
      <p>작성자: {post.author}</p>
      <p>
        {post.category} · {post.meditationDay}
      </p>
    </div>
  );
}
