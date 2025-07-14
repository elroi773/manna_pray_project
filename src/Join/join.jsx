// src/Join/join.jsx
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./join.css";

function Join() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>회원가입</h1>
        {!user ? (
          <>
            <p>Google 계정으로 회원가입</p>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwtDecode(credentialResponse.credential);
                console.log("회원가입 사용자:", decoded);
                setUser(decoded);
                navigate("/");
              }}
              onError={() => {
                console.log("회원가입 실패");
              }}
            />
            <p className="auth-link" onClick={() => navigate("/login")}>
              이미 계정이 있으신가요? 로그인
            </p>
          </>
        ) : (
          <div>
            <h2>{user.name} 님, 가입을 환영합니다!</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Join;
