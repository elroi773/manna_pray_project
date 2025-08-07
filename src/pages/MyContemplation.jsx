import React from "react";
import "./MyContemplation.css";

const youtubeVideos = [
  {
    day: "1일차",
    src: "https://www.youtube.com/embed/Gi5pEhruJQ8",
    title: "다시 일어서는 감사",
  },
  {
    day: "2일차",
    src: null,
    title: "coming soon",
  },
  {
    day: "3일차",
    src: null,
    title: "coming soon",
  },
  {
    day: "4일차",
    src: null,
    title: "coming soon",
  },
  {
    day: "5일차",
    src: null,
    title: "coming soon",
  },
  {
    day: "6일차",
    src: null,
    title: "coming soon",
  },
  {
    day: "7일차",
    src: null,
    title: "coming soon",
  },
];

export default function MeditationRecords() {
  return (
    <div className="container">
      <h1>나의 묵상 기록</h1>
      <div className="scroll-row">
        {youtubeVideos.map((video, index) => (
          <div key={index} className="video-card">
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
    </div>
  );
}
