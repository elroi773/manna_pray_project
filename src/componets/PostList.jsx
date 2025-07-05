// PostList.jsx
import React from "react";
import PostCard from "./PostCard";
import "./PostList.css";

const dummyPosts = [
  {
    category: "묵상",
    nickname: "치킨 먹는 용가리",
    username: "chickendragon",
    time: "18시간 전",
    content: "너희는 내게 부르짖으며 와서 내게 기도하면 내가 너희를 들을 것이요",
    comments: 69,
    shares: 69,
    bookmarks: 69,
    likes: 69,
  },
  {
    category: "응답",
    nickname: "치킨 먹는 용가리",
    username: "chickendragon",
    time: "18시간 전",
    content: "내가 또 너희에게 이르노니 구하라 그러면 너희에게 주실 것이요...",
    comments: 69,
    shares: 69,
    bookmarks: 69,
    likes: 69,
  },
  {
    category: "응답",
    nickname: "치킨 먹는 용가리",
    username: "chickendragon",
    time: "18시간 전",
    content: "내가 또 너희에게 이르노니 구하라 그러면 너희에게 주실 것이요...",
    comments: 69,
    shares: 69,
    bookmarks: 69,
    likes: 69,
  },
  {
    category: "응답",
    nickname: "치킨 먹는 용가리",
    username: "chickendragon",
    time: "18시간 전",
    content: "내가 또 너희에게 이르노니 구하라 그러면 너희에게 주실 것이요...",
    comments: 69,
    shares: 69,
    bookmarks: 69,
    likes: 69,
  },
  {
    category: "응답",
    nickname: "치킨 먹는 용가리",
    username: "chickendragon",
    time: "18시간 전",
    content: "내가 또 너희에게 이르노니 구하라 그러면 너희에게 주실 것이요...",
    comments: 69,
    shares: 69,
    bookmarks: 69,
    likes: 69,
  },
  {
    category: "응답",
    nickname: "치킨 먹는 용가리",
    username: "chickendragon",
    time: "18시간 전",
    content: "내가 또 너희에게 이르노니 구하라 그러면 너희에게 주실 것이요...",
    comments: 69,
    shares: 69,
    bookmarks: 69,
    likes: 69,
  },
  {
    category: "응답",
    nickname: "치킨 먹는 용가리",
    username: "chickendragon",
    time: "18시간 전",
    content: "내가 또 너희에게 이르노니 구하라 그러면 너희에게 주실 것이요...",
    comments: 69,
    shares: 69,
    bookmarks: 69,
    likes: 69,
  },
  {
    category: "응답",
    nickname: "치킨 먹는 용가리",
    username: "chickendragon",
    time: "18시간 전",
    content: "내가 또 너희에게 이르노니 구하라 그러면 너희에게 주실 것이요...",
    comments: 69,
    shares: 69,
    bookmarks: 69,
    likes: 69,
  },
  {
    category: "응답",
    nickname: "치킨 먹는 용가리",
    username: "chickendragon",
    time: "18시간 전",
    content: "내가 또 너희에게 이르노니 구하라 그러면 너희에게 주실 것이요...",
    comments: 69,
    shares: 69,
    bookmarks: 69,
    likes: 69,
  },
  {
    category: "응답",
    nickname: "치킨 먹는 용가리",
    username: "chickendragon",
    time: "18시간 전",
    content: "내가 또 너희에게 이르노니 구하라 그러면 너희에게 주실 것이요...",
    comments: 69,
    shares: 69,
    bookmarks: 69,
    likes: 69,
  },
  {
    category: "응답",
    nickname: "치킨 먹는 용가리",
    username: "chickendragon",
    time: "18시간 전",
    content: "내가 또 너희에게 이르노니 구하라 그러면 너희에게 주실 것이요...",
    comments: 69,
    shares: 69,
    bookmarks: 69,
    likes: 69,
  },
  {
    category: "응답",
    nickname: "치킨 먹는 용가리",
    username: "chickendragon",
    time: "18시간 전",
    content: "내가 또 너희에게 이르노니 구하라 그러면 너희에게 주실 것이요...",
    comments: 69,
    shares: 69,
    bookmarks: 69,
    likes: 69,
  },
  // 필요하면 더 추가
];

export default function PostList() {
  return (
    <div className="post-list">
      {dummyPosts.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </div>
  );
}
