// src/components/PostCard.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
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

  const localKey = `liked_post_${post.id}`;

  // 작성자 닉네임 가져오기
  useEffect(() => {
    const fetchAuthor = async () => {
      if (!post.author_id) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("nickname")
        .eq("id", post.author_id)
        .single();

      if (!error && data) setAuthorName(data.nickname);
    };
    fetchAuthor();
  }, [post.author_id]);

  // 최초 로드: DB 최신 like_count + 내 디바이스의 liked 상태
  useEffect(() => {
    const fetchLikeCount = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("like_count")
        .eq("id", post.id)
        .single();

      if (!error && data) setLikeCount(data.like_count ?? 0);
    };
    fetchLikeCount();

    const saved = localStorage.getItem(localKey);
    setLiked(saved === "1");
  }, [post.id, localKey]);

  // Realtime: 다른 사람이 누른 것도 즉시 반영
  useEffect(() => {
    const channel = supabase
      .channel(`post-like-${post.id}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "posts", filter: `id=eq.${post.id}` },
        (payload) => {
          const next = payload.new?.like_count ?? 0;
          setLikeCount(next);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [post.id]);

  // 상세 페이지 이동
  const handleCardClick = () => navigate(`/post/${post.id}`);

  // 하트 클릭 → 서버 RPC로 원자적 증가/감소
  const handleHeartClick = async (e) => {
    e.stopPropagation();

    if (!liked) {
      const { data, error } = await supabase.rpc("increment_post_like", {
        p_post_id: post.id,
      });
      if (!error) {
        setLiked(true);
        localStorage.setItem(localKey, "1");
        if (typeof data === "number") setLikeCount(data); // 서버 값 신뢰
      }
    } else {
      const { data, error } = await supabase.rpc("decrement_post_like", {
        p_post_id: post.id,
      });
      if (!error) {
        setLiked(false);
        localStorage.setItem(localKey, "0");
        if (typeof data === "number") setLikeCount(data);
      }
    }
  };

  return (
    <div className="post-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      <div className="category">{post.category}</div>

      <div className="header">
        <div
          style={{
            width: 40, height: 40, borderRadius: "50%",
            backgroundColor: circleColor, flexShrink: 0,
          }}
        />
        <div>
          <p className="nickname">{authorName}</p>
          <h3 style={{ margin: 0 }}>{post.title}</h3>
        </div>
      </div>

      <p className="content">{post.content}</p>

      <div className="icons">
        <button
          type="button"
          className="icon"
          style={{ cursor: "pointer", background: "transparent", border: "none", display: "flex", alignItems: "center", gap: 6 }}
          onClick={handleHeartClick}
          aria-label={liked ? "좋아요 취소" : "좋아요"}
        >
          <span style={{ fontSize: 20 }}>{liked ? "❤️" : "🤍"}</span>
          <span>{likeCount}</span>
        </button>
      </div>
    </div>
  );
}
