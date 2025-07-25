//componets/WritingButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./WritingButton.css";

export default function WritingButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("../Write");
  };

  return (
    <div>
      <button onClick={handleClick}>
        <img src="https://via.placeholder.com/40" alt="아이콘" />
      </button>
    </div>
  );
}
