// src/pages/Write.jsx
import React, { useState } from "react";
import "./Write.css";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Write() {
  const [category, setCategory] = useState("전체");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [useCurrentId, setUseCurrentId] = useState(true);
  const [customId, setCustomId] = useState("");
  const [selectedDay, setSelectedDay] = useState("1일차");

  const loggedInUser = "mirim123 수정예정"; // TODO: 실제 로그인 유저 정보로 변경
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      category,
      title,
      content,
      meditationDay: selectedDay,
      author: useCurrentId ? loggedInUser : customId,
      createdAt: serverTimestamp(),
    };

    try {
      // Firestore에 저장
      const docRef = await addDoc(collection(db, "posts"), postData);
      alert("게시글이 성공적으로 저장되었습니다!");

      // 해당 글 상세 페이지로 이동
      navigate(`/post/${docRef.id}`);

      // 입력값 초기화
      setTitle("");
      setContent("");
      setCustomId("");
      setCategory("전체");
      setSelectedDay("1일차");
      setUseCurrentId(true);
    } catch (error) {
      console.error("Error adding document: ", error);
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
            <option value="1일차">1일차</option>
            <option value="2일차">2일차</option>
            <option value="3일차">3일차</option>
            <option value="4일차">4일차</option>
            <option value="5일차">5일차</option>
            <option value="6일차">6일차</option>
            <option value="7일차">7일차</option>
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
            <label htmlFor="useCurrent">{loggedInUser} (현재 로그인 ID)</label>
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
