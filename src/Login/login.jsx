// src/Login/Login.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./login.css";

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 로그인 상태 감지
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 구글 로그인
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin, // 로그인 후 돌아올 주소
      },
    });
    if (error) {
      console.error("로그인 실패:", error);
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
            <h2>환영합니다, {user.user_metadata?.full_name || user.email}님!</h2>
            <button onClick={() => supabase.auth.signOut()}>로그아웃</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
