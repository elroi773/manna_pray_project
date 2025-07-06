import React from "react";
import "./MyRecords.css";

export default function MyRecords() {
  return (
    <main className="records-wrapper">
      <section className="records-grid">
        <Card
          id="prayer"
          title="Prayer topic"
          subtitle="나의 기도제목"
          img="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80"
        />
        <Card
          id="bible"
          title="Today's Bible"
          subtitle="오늘의 성경말씀"
          img="https://images.unsplash.com/photo-1528460033278-a6ba57020470?auto=format&fit=crop&w=800&q=80"
        />
        <Card
          id="contempla"
          title="Contemplation"
          subtitle="묵상 기록"
          img="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
        />
      </section>
    </main>
  );
}

function Card({ id, title, subtitle, img }) {
  return (
    <article
      id={id}
      className="card"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="card-content">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </article>
  );
}
