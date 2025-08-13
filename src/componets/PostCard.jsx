import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../supabaseClient';
import "./PostCard.css";

export default function PostCard({ post }) {
  if (!post) return null;

  const navigate = useNavigate(); 

  const colors = ["#E9789C", "#CC4787", "#FFFFFF", "#6C6CD0"];
  const circleColor = useMemo(
    () => colors[Math.floor(Math.random() * colors.length)],
    []
  );

  const [likeCount, setLikeCount] = useState(post.like_count || 0);
  const [liked, setLiked] = useState(false);
  const [authorName, setAuthorName] = useState("");

  // author 정보 가져오기
  useEffect(() => {
    const fetchAuthor = async () => {
      if (!post.author_id) return;
      const { data, error } = await supabase
        .from("profiles") // authors 테이블명 또는 profiles
        .select("nickname")
        .eq("id", post.author_id)
        .single();
      if (!error && data) {
        setAuthorName(data.nickname);
      }
    };
    fetchAuthor();
  }, [post.author_id]);

  // 상세 페이지 이동
  const handleCardClick = () => {
    navigate(`/post/${post.id}`);
  };

  const handleHeartClick = async (e) => {
    e.stopPropagation();
    if (!post) return;
  
    let newCount = liked ? likeCount - 1 : likeCount + 1;
  
    const { error } = await supabase
      .from("posts")
      .update({ like_count: newCount })
      .eq("id", post.id);
  
    if (!error) {
      setLiked(!liked);
      setLikeCount(newCount);
    }
  };
  

  return (
    <div className="post-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <div className="category">{post.category}</div>

      <div className="header">
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: circleColor,
            flexShrink: 0,
          }}
        ></div>
        <div>
          <p className="nickname">{authorName}</p>
          <h3 style={{ margin: 0 }}>{post.title}</h3>
        </div>
      </div>

      <p className="content">{post.content}</p>

      <div className="icons">
        <div
          className="icon"
          style={{ cursor: "pointer" }}
          onClick={handleHeartClick}
        >
          <span style={{ fontSize: "20px" }}>{liked ? "❤️" : "🤍"}</span>
          <span>{likeCount}</span>
        </div>
      </div>
    </div>
  );
}
