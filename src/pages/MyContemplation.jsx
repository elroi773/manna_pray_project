import React, { useState } from "react";
import "./MyContemplation.css";

const youtubeVideos = [
  {
    day: "1일차",
    src: "https://www.youtube.com/embed/Gi5pEhruJQ8",
    title: "다시 일어서는 감사",
    myReflection: "하나님의 은혜로 다시 일어서는 힘을 얻었습니다. 감사함으로 하루를 살아가겠습니다.",
    others: [
      "나도 오늘 말씀 통해 위로받았어요. - 사용자A",
      "기도하며 감사하는 삶을 살아야겠네요. - 사용자B",
    ],
  },
  {
    day: "2일차",
    src: null,
    title: "coming soon",
    myReflection: "",
    others: [],
  },
  {
    day: "3일차",
    src: null,
    title: "coming soon",
    myReflection: "",
    others: [],
  },
  {
    day: "4일차",
    src: null,
    title: "coming soon",
    myReflection: "",
    others: [],
  },
  {
    day: "5일차",
    src: null,
    title: "coming soon",
    myReflection: "",
    others: [],
  },
  {
    day: "6일차",
    src: null,
    title: "coming soon",
    myReflection: "",
    others: [],
  },
  {
    day: "7일차",
    src: null,
    title: "coming soon",
    myReflection: "",
    others: [],
  },
];

export default function MeditationRecords() {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleSelect = (index) => {
    setSelectedDay(index);
  };

  return (
    <div className="container">
      <h1>나의 묵상 기록</h1>
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
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="coming-soon">coming soon</div>
            )}
          </div>
        ))}
      </div>

      {selectedDay !== null && (
        <div className="reflection-section">
          <h2>{youtubeVideos[selectedDay].day} 묵상</h2>
          {youtubeVideos[selectedDay].myReflection ? (
            <p className="my-reflection">{youtubeVideos[selectedDay].myReflection}</p>
          ) : (
            <p className="my-reflection empty">아직 묵상글이 없습니다.</p>
          )}

          <h3>다른 사람들의 묵상글</h3>
          {youtubeVideos[selectedDay].others.length > 0 ? (
            <ul className="others-list">
              {youtubeVideos[selectedDay].others.map((entry, idx) => (
                <li key={idx}>{entry}</li>
              ))}
            </ul>
          ) : (
            <p className="others-empty">등록된 묵상글이 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
}