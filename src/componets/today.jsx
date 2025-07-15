import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import verses from "../data/verses.json";
import "./today.css";

function Today() {
    const [verse, setVerse] = useState(null);
    const navigate = useNavigate();
  
    const pickRandomVerse = () => {
      const randomIndex = Math.floor(Math.random() * verses.length);
      setVerse(verses[randomIndex]);
    };
  
    useEffect(() => {
      pickRandomVerse();
    }, []);
  
    if (!verse) return (
      <div className="today-container">
        <p className="loading">로딩 중...</p>
      </div>
    );
  
    return (
      <div className="today-container">
        <div className="verse-wrapper">
          <div className="verse-card">
            <h1 className="verse-title">📖 오늘의 성경 말씀</h1>
            <blockquote className="verse-text">{verse.text}</blockquote>
            <p className="verse-author">— {verse.author}</p>
            <div className="button-group">
              <button className="btn reshuffle-btn" onClick={pickRandomVerse}>
                🔁 다시 뽑기
              </button>
              <button className="btn back-btn" onClick={() => navigate("/")}>
                🔙 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Today;