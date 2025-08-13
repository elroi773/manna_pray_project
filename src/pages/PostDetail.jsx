// src/pages/PostDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function PostDetail({ userId }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // 게시글 불러오기
      let { data: postData, error: postError } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();
      if (!postError) setPost(postData);

      // 댓글 불러오기
      let { data: commentsData, error: commentError } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", id)
        .order("created_at", { ascending: true });
      if (!commentError) setComments(commentsData);
    };

    fetchData();
  }, [id]);

  // 댓글 추가
  const handleAddComment = async () => {
    if (!newComment.trim() || !userId) return;
  
    const { data, error } = await supabase
      .from("comments")
      .insert([{ post_id: id, user_id: userId, content: newComment }])
      .select();
  
    if (error) {
      console.error("댓글 등록 실패:", error);
      alert("댓글 등록 실패: " + error.message);
    } else {
      setComments([...comments, data[0]]);
      setNewComment("");
    }
  };
  

  // 댓글 수정 시작
  const handleEditStart = (comment) => {
    setEditingCommentId(comment.id);
    setEditingCommentText(comment.content);
  };

  // 댓글 수정 완료
  const handleEditSave = async (commentId) => {
    if (!editingCommentText.trim()) return;

    let { data, error } = await supabase
      .from("comments")
      .update({ content: editingCommentText })
      .eq("id", commentId)
      .select();

    if (!error && data.length > 0) {
      setComments(
        comments.map((c) => (c.id === commentId ? data[0] : c))
      );
      setEditingCommentId(null);
      setEditingCommentText("");
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (commentId) => {
    let { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (!error) {
      setComments(comments.filter((c) => c.id !== commentId));
    }
  };

  if (!post) return <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>;

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        border: "2px solid #E9789C",
        boxShadow: "0 4px 10px rgba(45, 42, 43, 0.1)",
      }}
    >
      {/* 돌아가기 버튼 */}
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

      {/* 게시글 제목 */}
      <h2
        style={{
          color: "#2D2A2B",
          marginBottom: "10px",
          borderBottom: "2px solid #6C6CD0",
          paddingBottom: "8px",
        }}
      >
        {post.title}
      </h2>

      {/* 카테고리 */}
      <p
        style={{
          display: "inline-block",
          backgroundColor: "#CC4787",
          color: "#FFFFFF",
          padding: "4px 10px",
          borderRadius: "8px",
          fontSize: "12px",
          marginBottom: "16px",
        }}
      >
        카테고리: {post.category}
      </p>

      {/* 게시글 내용 */}
      <div
        style={{
          color: "#2D2A2B",
          fontSize: "15px",
          lineHeight: "1.5",
          backgroundColor: "#fdf2f8",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #E9789C",
          marginBottom: "20px",
        }}
      >
        {post.content}
      </div>
    </div>
  );
}
