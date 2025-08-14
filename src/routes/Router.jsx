import { Routes, Route, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import CategoryPage from "../pages/CategoryPage";
import Write from "../pages/Write";
import Mypray from "../pages/Mypray";
import PostDetail from "../pages/PostDetail";
import Comtemplation from "../pages/MyContemplation";
import MyContemplation from "../pages/MyContemplation";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

function Layout({ loggedInUser }) {
  return (
    <div>
      {/* 예: <Header user={loggedInUser} /> */}
      <Outlet />
    </div>
  );
}

export default function AppRouter() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // 초기 세션 가져오기
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setLoggedInUser(session.user.email || session.user.user_metadata.full_name);
      }
    };
    getInitialSession();

    // 인증 상태 변경 감지
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setLoggedInUser(session.user.email || session.user.user_metadata.full_name);
      } else {
        setLoggedInUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout loggedInUser={loggedInUser} />}>
        <Route index element={<Home />} />
        <Route path="category/:categoryName" element={<CategoryPage />} />
        <Route path="write" element={<Write loggedInUser={loggedInUser} />} />
        <Route
            path="/mycomtemplation"
            element={<MyContemplation loggedInUser={loggedInUser} />}
          />
      </Route>
    </Routes>
  );
}
