// src/Login/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
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
    if (formData.name === "" || formData.password === "") {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    alert("로그인 성공!");
    navigate("/"); // 로그인 성공 후 홈으로 이동
  };

  return (
    <div className="login-container">
      <h1>로그인</h1>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit">로그인</button>
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

export default Login;
