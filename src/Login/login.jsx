import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./login.css"; // join이면 join.css

function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ 여기 아래에 Kakao 로그인 함수 넣기
  const handleKakaoLogin = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("40538baf4c86d4f3813eb46028d01f0e"); // 🔑 여기에 본인의 키 입력
    }

    window.Kakao.Auth.login({
      scope: "profile_nickname, account_email",
      success: function (authObj) {
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            const kakaoAccount = res.kakao_account;
            const user = {
              name: kakaoAccount.profile.nickname,
              email: kakaoAccount.email,
            };
            console.log("카카오 로그인 성공:", user);
            setUser(user);
            navigate("/");
          },
          fail: function (error) {
            console.error("카카오 사용자 정보 요청 실패:", error);
          },
        });
      },
      fail: function (err) {
        console.error("카카오 로그인 실패:", err);
      },
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>로그인</h1>
        {!user ? (
          <>
            <p>Google 계정 또는 카카오 계정으로 로그인하세요</p>
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
            <button className="kakao-button" onClick={handleKakaoLogin}>
              카카오톡으로 로그인
            </button>
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

export default Login;
