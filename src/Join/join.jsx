// src/Login/Join.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./join.css";

function Join() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 로그인/회원가입 상태 감지
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin, // 로그인/회원가입 후 돌아올 주소
      },
    });
    if (error) {
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
            <button onClick={handleGoogleSignUp}>
              Google 계정으로 회원가입
            </button>
            <p className="auth-link" onClick={() => navigate("/login")}>
              이미 계정이 있으신가요? 로그인
            </p>
          </>
        ) : (
          <div>
            <h2>
              {user.user_metadata?.full_name || user.email} 님, 가입을 환영합니다!
            </h2>
            <button onClick={() => supabase.auth.signOut()}>로그아웃</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Join;
