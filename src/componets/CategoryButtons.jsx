// CategoryButtons.jsx
import React from "react";
import "./CategoryButtons.css";

const categories = [
  "전체",
  "묵상",
  "개인",
  "가정",
  "사역",
  "중보",
  "국가",
  "공동체",
];

export default function CategoryButtons() {
  return (
    <div className="wrapper">
      {categories.map((label) => (
        <button key={label} className="btn">
          {label}
        </button>
      ))}
    </div>
  );
}
