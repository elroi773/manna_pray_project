// App.jsx
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./App.css";
import CategoryButtons from "./componets/CategoryButtons";
import PostList from "./componets/PostList";
import MyRecords from "./componets/MyRecords";
import Footer from "./componets/Footer";
import Post from "./Post";

function App() {
  const navigate = useNavigate();

  return (
    <div className="Top">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="menu">
        <button className="menu-button" onClick={() => navigate("/login")}>
          로그인
        </button>
        &nbsp;|&nbsp;
        <button className="menu-button" onClick={() => navigate("/join")}>
          회원가입
        </button>
      </div>

      <p>
        너희는 내게 부르짖으며 와서 내게 기도 하면 <br />
        내가 너희를 들을 것이요
      </p>
      <p id="chapter">예레미야 29 : 12</p>

      <CategoryButtons />
      <div className="Cards">
        <div className="prayTitle">
          <h2>인기 기도 제목</h2>
          <PostList />
        </div>
        <div className="prayTitle">
          <h2>인기 묵상</h2>
          <PostList />
        </div>
        <div className="prayTitle">
          <h2>나의 기록</h2>
          <MyRecords />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
