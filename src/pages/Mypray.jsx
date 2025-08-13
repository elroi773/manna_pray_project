import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./Mypray.css";

export default function Mypray() {
  const navigate = useNavigate();
  const [prayers, setPrayers] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUserId();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchPrayers = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("author", userId)
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching posts:", error);
      else setPrayers(data);
    };

    fetchPrayers();
  }, [userId]);

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

      <h1 className="title">나의 기도제목 기록</h1>

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
    </div>
  );
}
