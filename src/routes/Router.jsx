import { Routes, Route, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import CategoryPage from "../pages/CategoryPage";
import Write from "../pages/Write";
import Mypray from "../pages/Mypray";
import Contemplation from "../pages/MyContemplation";
import PostDetail from "./pages/PostDetail";

function Layout() {
  return (
    <div>
      {/* 공통 컴포넌트 예: <Header />, <CategoryButtons /> 등 넣을 수 있음 */}
      <Outlet />
    </div>
  );
}

export default function AppRouter() {
  return (
    <Routes>
      {/* ✅ 부모는 "/"로, Outlet 포함된 Layout */}
      <Route path="/" element={<Layout />}>
        {/* ✅ index ("/") 페이지 */}
        <Route index element={<Home />} />
        
        {/* ✅ "/category/..." 경로 */}
        <Route path="category/:categoryName" element={<CategoryPage />} />
        
        {/* ✅ "/write" 경로 */}
        <Route path="write" element={<Write loggedInUser="mirim123" />} />      </Route>

        <Route path="/post/:id" element={<PostDetail />} />


      {/* ❗ 맨 마지막에 NotFound 처리할 경우만 path="*" 사용 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}
