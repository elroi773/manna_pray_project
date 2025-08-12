// src/pages/Write.jsx
import React, { useState } from "react";
import "./Write.css";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Write({ loggedInUser }) {
  const [category, setCategory] = useState("전체");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [useCurrentId, setUseCurrentId] = useState(true);
  const [customId, setCustomId] = useState("");
  const [selectedDay, setSelectedDay] = useState("1일차");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 로그인 여부 확인
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("로그인 후 글을 작성할 수 있습니다.");
      navigate("/login");
      return;
    }

    const postData = {
      category,
      title,
      content,
      meditation_day: selectedDay,
      author: useCurrentId ? user.id : customId, // UID 사용
      created_at: new Date().toISOString(),
    };

    try {
      const { error } = await supabase
        .from("posts")
        .insert([postData]); // .select() 제거

      if (error) throw error;

      alert("게시글이 성공적으로 저장되었습니다!");
      navigate("/"); // 글 목록으로 이동 (단일 글 페이지로 이동하려면 SELECT 정책 필요)

      // 폼 초기화
      setTitle("");
      setContent("");
      setCustomId("");
      setCategory("전체");
      setSelectedDay("1일차");
      setUseCurrentId(true);
    } catch (error) {
      console.error("Error adding post:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="write-post-container">
      <h2>글쓰기</h2>
      <form onSubmit={handleSubmit}>
        <label>
          카테고리:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="전체">전체</option>
            <option value="묵상">묵상</option>
            <option value="개인">개인</option>
            <option value="가정">가정</option>
            <option value="사역">사역</option>
            <option value="중보">중보</option>
            <option value="국가">국가</option>
            <option value="공동체">공동체</option>
          </select>
        </label>

        <label>
          변화산 몇일차인가요?
          <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
            {[...Array(7)].map((_, i) => (
              <option key={i} value={`${i + 1}일차`}>
                {i + 1}일차
              </option>
            ))}
          </select>
        </label>

        <label>
          제목:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          내용:
          <textarea
            rows="8"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>

        <label>
          작성자 ID:
          <div>
            <input
              type="radio"
              id="useCurrent"
              name="author"
              checked={useCurrentId}
              onChange={() => setUseCurrentId(true)}
            />
            <label htmlFor="useCurrent">
              {loggedInUser || "로그인 필요"} (현재 로그인 ID)
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="useCustom"
              name="author"
              checked={!useCurrentId}
              onChange={() => setUseCurrentId(false)}
            />
            <label htmlFor="useCustom">다른 ID 사용</label>
            {!useCurrentId && (
              <input
                type="text"
                value={customId}
                onChange={(e) => setCustomId(e.target.value)}
                placeholder="사용자 ID 입력"
                required
              />
            )}
          </div>
        </label>

        <button type="submit">등록</button>
      </form>
    </div>
  );
}
