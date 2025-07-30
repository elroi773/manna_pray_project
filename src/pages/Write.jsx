import React, { useState } from "react";
import "./Write.css";

export default function Write({ loggedInUser }) {
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
    // 여기에 POST 요청 보내는 코드 추가 가능
  };

  return (
    <div className="write-post-container">
      <h2>글쓰기</h2>
      <form onSubmit={handleSubmit}>
        <label>
          카테고리:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
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
          ></textarea>
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
