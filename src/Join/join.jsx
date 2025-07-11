// src/Join/Join.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Join.css";

function Join() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    alert("회원가입 완료!");
    navigate("/"); // 회원가입 완료 후 홈으로 이동
  };

  return (
    <div className="join-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit} className="join-form">
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">가입하기</button>
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/")}
        >
          돌아가기
        </button>
      </form>
    </div>
  );
}

export default Join;
