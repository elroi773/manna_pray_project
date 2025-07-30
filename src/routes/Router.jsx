import { Routes, Route, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import CategoryPage from "../pages/CategoryPage";
import Write from "../pages/Write";
import CategoryButtons from "../componets/CategoryButtons";

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default function AppRouter() {
    return (
      <Routes>
        {/* 부모 경로에 반드시 path="*" 와일드카드 붙이기 */}
        <Route path="*" element={<Layout />}>
          {/* index 경로 (기본 페이지) */}
          <Route index element={<Home />} />
          <Route path="category/:categoryName" element={<CategoryPage />} />
          <Route path="write" element={<Write loggedInUser="mirim123" />} />
        </Route>
      </Routes>
    );
  }