import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import "./join.css";

function Join() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("회원가입 사용자 (Firebase):", user);
      setUser({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      });
      navigate("/");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>회원가입</h1>
        {!user ? (
          <>
            <p>Google 계정으로 회원가입</p>
            <button onClick={handleGoogleSignUp}>Google 계정으로 회원가입</button>
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
