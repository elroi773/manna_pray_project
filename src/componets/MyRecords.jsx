import React from "react";
import "./MyRecords.css";

import MyRecord1 from "./img/MyRecord1.png";
import MyRecord2 from "./img/MyRecord2.png";
import MyRecord3 from "./img/MyRecord3.png";
import MyRecord_Mobile1 from "./img/MyRecord_Mobile1.png";
import MyRecord_Mobile2 from "./img/MyRecord_Mobile2.png";
import MyRecord_Mobile3 from "./img/MyRecord_Mobile3.png";

const records = [
  { id: "prayer", title: "Prayer topic", subtitle: "나의 기도제목", img: MyRecord1 },
  { id: "bible", title: "Today's Bible", subtitle: "오늘의 성경말씀", img: MyRecord2 },
  { id: "contempla", title: "Contemplation", subtitle: "묵상 기록", img: MyRecord3 },
];

export default function MyRecords() {
  return (
    <div className="recordsWrapper">
      <section className="recordsGrid">
        {records.map((record) => (
          <Card key={record.id} {...record} />
        ))}
      </section>
    </div>
  );
}

function Card({ id, title, subtitle, img }) {
  return (
    <article
      id={id}
      className="card"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="cardContent">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </article>
  );
}
