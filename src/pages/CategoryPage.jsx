import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import PostCard from "../componets/PostCard";
import "./CategoryPage.css";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        let query = supabase.from("posts").select("*").order("created_at", { ascending: false });
        if (categoryName !== "전체") {
          query = query.eq("category", categoryName);
        }
        const { data, error } = await query;
        if (error) throw error;
        setPosts(data);
      } catch (error) {
        console.error(error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [categoryName]);

  return (
    <div className="category-page">
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#6C6CD0",
          color: "#FFFFFF",
          border: "none",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "12px",
        }}
      >
        ← 돌아가기
      </button>

      <h2>{categoryName} 카테고리 게시글</h2>

      {loading && <p className="loading">로딩 중...</p>}

      {!loading && posts.length === 0 && (
        <p className="no-posts">게시글이 없습니다.</p>
      )}

      <div className="posts-list">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
