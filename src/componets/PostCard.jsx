import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostCard.css";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post.likes || 0); // 초기값 보정

  const handleClick = () => {
    navigate(`/post/${post.id}`, { relative: "path" });
  };

  const handleLikeClick = (e) => {
    e.stopPropagation(); // 카드 전체 클릭 막기
    setLikes((prev) => prev + 1);
    // TODO: Firestore에 좋아요 반영 로직 추가
  };

  return (
    <div className="post-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="top-row">
        <span className="badge">{post.category}</span>
        <span className="time">{post.time}</span>
      </div>

      {/* ✅ 묵상 일차 표시 */}
      {post.meditationDay && (
        <div className="meditation-day">
          <strong>{post.meditationDay}</strong>
        </div>
      )}

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
        <div className="icon like" onClick={handleLikeClick}>
          ❤️ {likes}
        </div>
      </div>
    </div>
  );
}
