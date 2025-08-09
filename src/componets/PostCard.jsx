import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns"; // 시간 표현용, 필요시 설치: npm install date-fns
import "./PostCard.css";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post.likes || 0);

  // createdAt이 Firestore Timestamp 객체일 경우 JS Date로 변환 필요
  const createdAtDate = post.createdAt ? post.createdAt.toDate() : null;

  const handleClick = () => {
    navigate(`/post/${post.id}`, { relative: "path" });
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setLikes((prev) => prev + 1);
    // TODO: Firestore 좋아요 업데이트 로직 추가 가능
  };

  return (
    <div className="post-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="top-row">
        <span className="badge">{post.category}</span>
        <span className="time">
          {createdAtDate ? formatDistanceToNow(createdAtDate, { addSuffix: true }) : ""}
        </span>
      </div>

      {post.meditationDay && (
        <div className="meditation-day">
          <strong>{post.meditationDay}</strong>
        </div>
      )}

      <div className="user-info">
        <div className="profile-image" />
        <div className="user-text">
          <p className="nickname">{post.author || "익명"}</p>
          {/* username 필드는 없으니 제거하거나 author로 대체 */}
        </div>
      </div>

      {/* title 추가 */}
      <h3 className="post-title">{post.title}</h3>

      <p className="content">{post.content}</p>

      <div className="icons">
        {/* dummy 데이터였던 아이콘들은 없으니 제거하거나 추가 기능 구현 시 추가 */}
        <div className="icon like" onClick={handleLikeClick}>
          ❤️ {likes}
        </div>
      </div>
    </div>
  );
}
