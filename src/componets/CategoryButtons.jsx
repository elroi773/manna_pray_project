// components/CategoryButtons.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryButtons.css";

const categories = [
  "전체",
  "묵상",
  "개인",
  "가정",
  "사역",
  "중보",
  "국가",
  "글 쓰러가기",
];

export default function CategoryButtons() {
  const navigate = useNavigate();

  const handleClick = (label) => {
    if (label === "글 쓰러가기") {
      navigate("/write"); 
    } else {
      navigate(`/category/${label}`);
    }
  };

  return (
    <div className="wrapper">
      {categories.map((label) => (
        <button key={label} className="btn" onClick={() => handleClick(label)}>
          {label}
        </button>
      ))}
    </div>
  );
}