import React from "react";
import { useNavigate } from "react-router-dom";
import "./Mypray.css";

export default function Mypray() {
  const navigate = useNavigate();

  return (
    <div className="pray-container">
      <h1 className="title">나의 기도제목 기록</h1>

      <div className="pray-list">
        <div className="pray-card">
          <h3>2025-08-06</h3>
          <p>가족의 건강과 안전을 위해 기도합니다.</p>
        </div>
        <div className="pray-card">
          <h3>2025-08-05</h3>
          <p>학교에서의 지혜와 평안을 위해 기도합니다.</p>
        </div>
        {/* 더 많은 기도제목들을 여기에 추가하거나 map 사용 */}
      </div>

      <button className="write-button" onClick={() => navigate("/write")}>
        🙏 새 기도제목 기록하기
      </button>
    </div>
  );
}
