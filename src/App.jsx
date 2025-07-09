import logo from "./logo.png";
import "./App.css";
import CategoryButtons from "./componets/CategoryButtons";
import PostList from "./componets/PostList";
import MyRecords from "./componets/MyRecords";

function App() {
  return (
    <div className="Top">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="menu">
        <a href="./Login/login.jsx">로그인</a>
        &nbsp;|&nbsp;
        <a href="./Join/join.jsx">회원가입</a>
      </div>
      <p>
        너희는 내게 부르짖으며 와서 내게 기도 하면 <br />
        내가 너희를 들을 것이요
      </p>
      <p id="chapter">예레미야 29 : 12</p>

      <CategoryButtons />

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

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-info">
            <h3 className="footer-logo">🙏 Pray With Us</h3>
            <p className="footer-desc">기도로 하나 되는 공간</p>
            <p className="footer-maker">제작 : 김이레</p>
          </div>
          <div className="footer-links">
            <a
              href="https://github.com/elroi773/manna_pray_project"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.instagram.com/e1_r0i73/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Pray With Us. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
