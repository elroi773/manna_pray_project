import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Mypray.css";

export default function Mypray() {
  const navigate = useNavigate();
  const [prayers, setPrayers] = useState([]);
  const [username, setUsername] = useState(null);
  const [randomPrayer, setRandomPrayer] = useState(null);

  // 로그인된 사용자 이름 가져오기
  useEffect(() => {
    const getUsername = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        return;
      }

      if (user) {
        // 1) user_metadata에 name이 있는 경우
        if (user.user_metadata?.name) {
          setUsername(user.user_metadata.name);
        } else {
          // 2) users 테이블에서 name 가져오기
          const { data: profileData, error: profileError } = await supabase
            .from("users")
            .select("name")
            .eq("id", user.id)
            .single();

          if (profileError) {
            console.error("Error fetching profile:", profileError);
          } else {
            setUsername(profileData.name);
          }
        }
      }
    };
    getUsername();
  }, []);

  // 이름 기준으로 기도제목 불러오기
  useEffect(() => {
    if (!username) return;

    const fetchPrayers = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("author", username) // author가 이름과 같은 데이터
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPrayers(data);
      }
    };

    fetchPrayers();
  }, [username]);

  // 랜덤 다른 사용자의 기도제목
  const handleRandomPrayer = async () => {
    if (!username) return;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .neq("author", username) // 현재 사용자 이름 제외
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching random prayer:", error);
      return;
    }

    if (data.length === 0) {
      alert("다른 사용자의 기도제목이 없습니다.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * data.length);
    setRandomPrayer(data[randomIndex]);
  };

  return (
    <div className="pray-container">
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#6C6CD0",
          color: "#FFFFFF",
          border: "none",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "12px",
        }}
      >
        ← 돌아가기
      </button>

      <h1 className="title">{username ? `${username}님의 기도제목 기록` : "나의 기도제목 기록"}</h1>

      <div className="pray-list">
        {prayers.length === 0 ? (
          <p>아직 기록된 기도제목이 없습니다.</p>
        ) : (
          prayers.map((p) => (
            <div key={p.id} className="pray-card">
              <div className="pray-card-header">
                <h3>{p.title}</h3>
                <span className="pray-date">
                  {new Date(p.created_at).toLocaleString()}
                </span>
              </div>
              <p className="pray-content">{p.content}</p>
              <span className="pray-day">{p.meditation_day}</span>
            </div>
          ))
        )}
      </div>

      <button className="write-button" onClick={() => navigate("/write")}>
        🙏 새 기도제목 기록하기
      </button>

      <button
        className="write-button"
        style={{ marginTop: "12px", backgroundColor: "#FF7F50" }}
        onClick={handleRandomPrayer}
      >
        🎲 랜덤 기도제목 보기
      </button>
      <p
        style={{
          fontSize: "12px",
          color: "#888",
          marginTop: "8px",
          textAlign: "center",
        }}
      >
        서로 기도 합시다!
      </p>

      {randomPrayer && (
        <div
          className="pray-card"
          style={{ marginTop: "16px", border: "2px dashed #FF7F50" }}
        >
          <div className="pray-card-header">
            <h3>{randomPrayer.title}</h3>
            <span className="pray-date">
              {new Date(randomPrayer.created_at).toLocaleString()}
            </span>
          </div>
          <p className="pray-content">{randomPrayer.content}</p>
          <span className="pray-day">{randomPrayer.meditation_day}</span>
        </div>
      )}
    </div>
  );
}
