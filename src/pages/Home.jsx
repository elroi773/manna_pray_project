// src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../App.css";
import useScrollFadeIn from "../hooks/useScrollFadeIn";

import logo from "../logo.png";
import CategoryButtons from "../componets/CategoryButtons";
import PostList from "../componets/PostList";
import MyRecords from "../componets/MyRecords";
import Footer from "../componets/Footer";


export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]); // 글 데이터 상태 추가

  const fadeInPray = useScrollFadeIn("up", 1, 0);
  const fadeInMeditation = useScrollFadeIn("up", 1, 0.3);
  const fadeInRecords = useScrollFadeIn("up", 1, 0.6);

  useEffect(() => {
    // 현재 세션 가져오기
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getUser();

    // 로그인 상태 변경 감지
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 글 목록 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("게시글 불러오기 오류:", error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <div className="Top">
      <img src={logo} className="App-logo" alt="logo" />

      <div className="menu">
        {user ? (
          <>
            <span className="user-info">
              {user.user_metadata?.full_name || user.email} 님
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
        <h1>Faith Time</h1>
      <p id="chapter">내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라<br/>빌립보서 4 : 13</p> 

      <CategoryButtons />
      
      <div className="Cards">
        <div className="prayTitle" {...fadeInPray}>
          <h2>최근 기도제목</h2>
          <PostList posts={posts.filter(post => post.category !== "묵상")} />
        </div>
        <div className="prayTitle" {...fadeInMeditation}>
          <h2>최근 묵상</h2>
          <PostList posts={posts.filter(post => post.category === "묵상")} />
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
