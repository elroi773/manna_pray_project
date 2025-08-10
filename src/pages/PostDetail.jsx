// src/pages/PostDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { formatDistanceToNow } from "date-fns"; // npm install date-fns

export default function PostDetail() {
  const { id } = useParams(); // URL에서 id 가져오기
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setPost({ id: snap.id, ...snap.data() });
        } else {
          setPost(null);
        }
      } catch (err) {
        console.error("Failed to fetch post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div>불러오는 중...</div>;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  const createdAtDate = post.createdAt ? post.createdAt.toDate() : null;

  return (
    <div className="post-detail">
      <button onClick={() => navigate(-1)}>← 뒤로</button>
      <h1>{post.title}</h1>
      <div>
        <span>{post.category}</span> · <strong>{post.author || "익명"}</strong>
      </div>
      <div>
        {createdAtDate
          ? formatDistanceToNow(createdAtDate, { addSuffix: true })
          : ""}
      </div>
      <article>{post.content}</article>
    </div>
  );
}
