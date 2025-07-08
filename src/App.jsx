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
        <a href="#">로그인</a>
        &nbsp;|&nbsp;
        <a href="#">회원가입</a>
      </div>
      <p>
        너희는 내게 부르짖으며 와서 내게 기도 하면 <br />
        내가 너희를 들을 것이요
      </p>
      <p id="chapter">예레미야 29 : 12</p>

      <CategoryButtons />

      <div className="prayTitle">
        <h2>인기 기도 제목
          commit test
        </h2>
        <PostList />
      </div>
      <div className="prayTitle">
        <h2>인기 묵상</h2>
        <PostList />
      </div>
      <div className="Myhistory">
        <h2>나의 기록</h2>
        <MyRecords /> 
      </div>
    </div>
  );
}

export default App;
