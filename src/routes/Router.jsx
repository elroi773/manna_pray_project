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
      <Route path="*" element={<Layout />}>
        <Route index element={<Home />} />               {/* 기본 / 경로 */}
        <Route path="category/:categoryName" element={<CategoryPage />} />
        <Route path="write" element={<Write loggedInUser="mirim123" />} />
      </Route>
    </Routes>
  );
}
