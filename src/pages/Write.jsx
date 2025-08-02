// src/pages/Write.jsx
import React, { useState } from "react";
import "./Write.css";
import { useAuth } from "../contexts/AuthContext"; // ✅ 추가

export default function Write() {
  const { currentUser } = useAuth(); // ✅ 현재 로그인한 유저
  const loggedInUser = currentUser?.displayName || currentUser?.email || "익명";

  const [category, setCategory] = useState("전체");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [useCurrentId, setUseCurrentId] = useState(true);
  const [customId, setCustomId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      category,
      title,
      content,
      author: useCurrentId ? loggedInUser : customId,
    };

    console.log("제출할 글 데이터:", postData);
    // 여기에 Firestore 저장 등 가능
  };

  return (
    <div className="write-post-container">
      <h2>글쓰기</h2>
      <form onSubmit={handleSubmit}>
        {/* 기존 코드 동일 */}
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
