// src/components/PostList.jsx
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import "./PostList.css";
import { supabase } from "../supabaseClient";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 게시글 불러오기
  const fetchPosts = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("게시글 불러오기 오류:", error);
      setPosts([]);
    } else {
      setPosts(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();

    // 실시간 구독 (추가/수정/삭제 반영)
    const channel = supabase
      .channel("posts-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="post-list">
      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}
