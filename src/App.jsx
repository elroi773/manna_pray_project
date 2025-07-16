// App.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import "./App.css";
import useScrollFadeIn from "./hooks/useScrollFadeIn";

import logo from "./logo.png";

import CategoryButtons from "./componets/CategoryButtons";
import PostList from "./componets/PostList";
import MyRecords from "./componets/MyRecords";
import Footer from "./componets/Footer";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fadeInPray = useScrollFadeIn("up", 1, 0);
  const fadeInMeditation = useScrollFadeIn("up", 1, 0.3);
  const fadeInRecords = useScrollFadeIn("up", 1, 0.6);

  // 로그인 상태 감지
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

  // 로그아웃 함수
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className="Top">
      <img src={logo} className="App-logo" alt="logo" />

      {/* 상단 메뉴 */}
      <div className="menu">
        {user ? (
          <>
            <span className="user-info">
              {user.displayName || user.email} 님
            </span>
            &nbsp;|&nbsp;
            <button className="menu-button" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button className="menu-button" onClick={() => navigate("/login")}>
              로그인
            </button>
            &nbsp;|&nbsp;
            <button className="menu-button" onClick={() => navigate("/join")}>
              회원가입
            </button>
          </>
        )}
      </div>

      {/* 메인 문구 */}
      <p>
        너희는 내게 부르짖으며 와서 내게 기도 하면 <br />
        내가 너희를 들을 것이요
      </p>
      <p id="chapter">예레미야 29 : 12</p>

      {/* 콘텐츠 영역 */}
      <CategoryButtons />
      <div className="Cards">
        <div className="prayTitle" {...fadeInPray}>
          <h2>공감을 많이 받은 기도제목</h2>
          <PostList />
        </div>
        <div className="prayTitle" {...fadeInMeditation}>
          <h2>공감을 많이 받은 묵상</h2>
          <PostList />
        </div>
        <div className="prayTitle" {...fadeInRecords}>
          <h2>나의 기록</h2>
          <MyRecords />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
