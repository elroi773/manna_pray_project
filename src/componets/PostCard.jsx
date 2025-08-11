import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns"; // 시간 표현용, 필요시 설치: npm install date-fns
import "./PostCard.css";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post.likes || 0);

  // 랜덤 색상 배열 (Faith Time 테마 색상들)
  const profileColors = [
    'linear-gradient(135deg, #8A2BE2 0%, #FF1493 100%)', // 보라-핑크
    'linear-gradient(135deg, #FF1493 0%, #8A2BE2 100%)', // 핑크-보라
    'linear-gradient(135deg, #DDA0DD 0%, #FF1493 100%)', // 연보라-핑크
    'linear-gradient(135deg, #8A2BE2 0%, #DDA0DD 100%)', // 보라-연보라
    'linear-gradient(135deg, #FF1493 0%, #FFB6C1 100%)', // 핑크-연핑크
    'linear-gradient(135deg, #9370DB 0%, #FF69B4 100%)', // 미디엄보라-핫핑크
    'linear-gradient(135deg, #BA55D3 0%, #FF1493 100%)', // 미디엄오키드-딥핑크
  ];

  // 사용자별 고유 색상 (author 이름 기반으로 일관성 유지)
  const getProfileColor = (author) => {
    if (!author) return profileColors[0];
    let hash = 0;
    for (let i = 0; i < author.length; i++) {
      hash = author.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % profileColors.length;
    return profileColors[index];
  };

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
        <div 
          className="profile-image" 
          style={{ background: getProfileColor(post.author) }}
        />
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