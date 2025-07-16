  import React, { useState } from "react";
  import { GoogleLogin } from "@react-oauth/google";
  import { jwtDecode } from "jwt-decode";
  import { useNavigate } from "react-router-dom";
  import "./login.css"; 
  import { auth, provider } from "../firebase"; //firebase 추가 
  import { signInWithPopup } from "firebase/auth";

  function Login() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    return (
      <div className="auth-page">
        <div className="auth-container">
          <h1>로그인</h1>
          {!user ? (
            <>
              <p>Google 계정으로 로그인하세요</p>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log("Google 로그인 성공:", decoded);
                  setUser(decoded);
                  navigate("/");
                }}
                onError={() => {
                  console.log("Google 로그인 실패");
                }}
              />
              <p className="auth-link" onClick={() => navigate("/join")}>
                아직 계정이 없으신가요? 회원가입
              </p>
            </>
          ) : (
            <div>
              <h2>환영합니다, {user.name}님!</h2>
            </div>
          )}
        </div>
      </div>
    );
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("로그인 성공:", result.user);
    } catch (err) {
      console.error("로그인 실패:", err);
    }
  };

  export default Login;
