// src/Login/login.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import "./login.css";

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Firebase 로그인 상태 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("로그인 성공:", result.user);
      navigate("/"); // 로그인 성공하면 홈으로 이동
    } catch (err) {
      console.error("로그인 실패:", err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>로그인</h1>
        {!user ? (
          <>
            <p>Google 계정으로 로그인하세요</p>
            <button onClick={handleGoogleLogin}>Google 로그인</button>
            <p className="auth-link" onClick={() => navigate("/join")}>
              아직 계정이 없으신가요? 회원가입
            </p>
          </>
        ) : (
          <div>
            <h2>환영합니다, {user.displayName || user.email}님!</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
