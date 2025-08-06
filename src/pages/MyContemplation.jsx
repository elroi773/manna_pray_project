import React from "react";
import { useNavigate } from "react-router-dom";
import "./MyContemplation.css";

export default function MyContemplation() {
  const navigate = useNavigate();

  return (
    <div className="contemplation-container">
      <h1 className="title">나의 묵상 기록</h1>

      <div className="record-list">
        <div className="record-card">
          <h3>2025-08-06</h3>
          <p>오늘 본 말씀: 시편 23편<br />묵상 내용: 하나님은 나의 목자시다...</p>
        </div>
        <div className="record-card">
          <h3>2025-08-05</h3>
          <p>오늘 본 말씀: 요한복음 15장<br />묵상 내용: 나는 포도나무요...</p>
        </div>
        {/* 더 많은 기록을 map으로 불러오거나 수동으로 추가 */}
      </div>

      <button className="write-button" onClick={() => navigate("/write")}>
        ✍️ 새 묵상 기록하기
      </button>
    </div>
  );
}
