import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./MyContemplation.css";

export default function MeditationRecords() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [myReflection, setMyReflection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  // 로그인 user 정보 가져오기
  useEffect(() => {
    const fetchUserName = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("사용자 불러오기 실패:", error);
        return;
      }

      if (!user) {
        console.log("로그인된 사용자 없음");
        return;
      }

      const name =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        "알 수 없음";
      console.log("로그인 사용자 이름:", name);
      setLoggedInUser(name);
    };

    fetchUserName();
  }, []);

  const youtubeVideos = [
    {
      day: "주일",
      src: "https://www.youtube.com/embed/4RFnIPRLKmQ?list=PLdMv0JwvPIiAFwlr4nTs7hbPmgJaw9SxL",
      title: "하나님이 하시는 일을 우리는 '기적' 이라 부른다!",
    },
    {
      day: "1일차",
      src: "https://www.youtube.com/embed/zjHZnoFnIvo",
      title: "억울한 인생에 찾아오신 하나님!",
    },
    {
      day: "2일차",
      src: "https://www.youtube.com/embed/2L8ymRtu7Pw",
      title: "화가 난 인생에 찾아오신 하나님",
    },
    {
      day: "3일차",
      src: "https://www.youtube.com/embed/KPrf08xPgDE",
      title: "회복시키시는 하나님",
    },
    {
      day: "4일차",
      src: "https://www.youtube.com/embed/Bxkdc7R7QuQ",
      title: "진정한 회복 벧엘로 올라가자!",
    },
    {
      day: "5일차",
      src: "https://www.youtube.com/embed/DEKLnvEe6Ow",
      title: "복에 집착하지 말라!",
    },
    { day: "6일차", src: "https://youtu.be/embed/sqbYba3u8sU", title: "하나님을 찾으라 매달림" }
  ];

  const handleSelect = async (index) => {
    console.log(`=== ${youtubeVideos[index].day} 선택 ===`);
    setSelectedDay(index);

    if (!loggedInUser) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("author", loggedInUser)
        .eq("category", "묵상")
        .eq("meditation_day", youtubeVideos[index].day)
        .order("created_at", { ascending: false });

      console.log("Supabase 쿼리 결과:", { data, error });

      if (error) {
        console.error("내 묵상글 불러오기 에러:", error);
        alert("묵상글을 불러오는 중 오류가 발생했습니다.");
        return;
      }

      setMyReflection(data || []);

      if (data.length > 0) {
        console.log(
          `${youtubeVideos[index].day} 묵상글 발견:`,
          data[0].content?.substring(0, 50) + "..."
        );
      } else {
        console.log(`${youtubeVideos[index].day} 묵상글이 없습니다.`);
      }
    } catch (err) {
      console.error("예기치 못한 에러:", err);
      alert("예기치 못한 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleWriteClick = () => {
    if (selectedDay !== null) {
      navigate("/write", {
        state: {
          meditation_day: youtubeVideos[selectedDay].day,
        },
      });
    }
  };

  const handleEditClick = () => {
    if (myReflection.length > 0) {
      navigate("/write", {
        state: {
          editMode: true,
          postId: myReflection[0].id,
          meditation_day: youtubeVideos[selectedDay].day,
          content: myReflection[0].content,
        },
      });
    }
  };

  return (
    <div className="i">
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#171617",
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

      <h1>나의 묵상 기록</h1>

      {/* 영상 목록 */}
      <div className="scroll-row">
        {youtubeVideos.map((video, index) => (
          <div
            key={index}
            className={`video-card ${selectedDay === index ? "selected" : ""}`}
            onClick={() => handleSelect(index)}
          >
            <h4>{video.day}</h4>
            {video.src ? (
              <iframe
                src={video.src}
                title={video.title}
                frameBorder="0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  border: "none",
                  width: "100%",
                  height: "200px",
                  borderRadius: "8px",
                }}
              ></iframe>
            ) : (
              <div className="coming-soon">coming soon</div>
            )}
          </div>
        ))}
      </div>

      <br />
      <br />

      {loading && (
        <div className="loading">
          <p>묵상글을 불러오는 중...</p>
        </div>
      )}

      {selectedDay !== null && !loading && myReflection.length > 0 && (
        <div className="reflection-section">
          <h2>📝 {youtubeVideos[selectedDay].day} 나의 묵상</h2>
          <div className="my-reflection emphasized">
            <p>{myReflection[0].content}</p>
            <div className="reflection-actions">
              <small>
                작성일:{" "}
                {new Date(myReflection[0].created_at).toLocaleDateString(
                  "ko-KR"
                )}
                {myReflection[0].updated_at &&
                  myReflection[0].updated_at !== myReflection[0].created_at && (
                    <span>
                      {" "}
                      (수정됨:{" "}
                      {new Date(myReflection[0].updated_at).toLocaleDateString(
                        "ko-KR"
                      )}
                      )
                    </span>
                  )}
              </small>
            </div>
          </div>
        </div>
      )}

      {selectedDay !== null && !loading && myReflection.length === 0 && (
        <div className="my-reflection empty">
          <p>
            아직 <strong>{youtubeVideos[selectedDay].day}</strong> 묵상글이
            없습니다.
          </p>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
            영상을 보고 묵상한 내용을 기록해보세요.
          </p>
          <button className="write-button" onClick={handleWriteClick}>
            ✍️ {youtubeVideos[selectedDay].day} 묵상 적으러 가기
          </button>
        </div>
      )}

      {selectedDay === null && (
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px",
            color: "#666",
          }}
        >
          <p>📹 위의 영상을 선택하여 나의 묵상 기록을 확인해보세요.</p>
        </div>
      )}
    </div>
  );
}
