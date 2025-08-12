// src/pages/PostDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data) {
          setPost(data);
        } else {
          alert("게시글을 찾을 수 없습니다.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        alert("게시글을 불러오는 중 오류가 발생했습니다.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  if (loading) return <p>로딩 중...</p>;
  if (!post) return null;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>작성자: {post.author}</p>
      <p>카테고리: {post.category}</p>
      <p>묵상일차: {post.meditation_day}</p>
      <p>{post.content}</p>
    </div>
  );
}
