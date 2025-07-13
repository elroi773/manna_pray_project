import React from "react";
import { useParams } from "react-router-dom";
import "./Post.css"; // ✅ CSS 파일 import

function Post() {
  const { id } = useParams();

  const post = {
    category: "성경 구절",
    nickname: "치킨 먹는 용가리",
    username: "chickendragon",
    time: "18시간 전",
    content: "너희는 내게 부르짖으며 와서 내게 기도하면 내가 너희를 들을 것이요",
    comments: 69,
    shares: 69,
    reports: 69,
    likes: 69,
  };

  return (
    <div className="post-container">
      <div className="post-card">
        <div className="post-category">{post.category}</div>

        <div className="post-header">
          <div>
            <div className="post-nickname">{post.nickname}</div>
            <div className="post-username">{post.username}</div>
          </div>
          <div className="post-time">{post.time}</div>
        </div>

        <p className="post-content">{post.content}</p>

        <div className="post-icons">
          <div>💬 {post.comments}</div>
          <div>🔁 {post.shares}</div>
          <div>🚩 {post.reports}</div>
          <div>❤️ {post.likes}</div>
        </div>

        <div className="post-id">게시글 ID: {id}</div>
      </div>
    </div>
  );
}

export default Post;
