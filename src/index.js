import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // ✅ 추가

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>  {/* ✅ 여기서만 BrowserRouter 사용 */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
