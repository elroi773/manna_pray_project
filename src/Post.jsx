import React from "react";
import { useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();

  return (
    <div style={{ padding: "40px" }}>
      <h1>게시글 상세 페이지</h1>
      <p>게시글 ID: {id}</p>
      {/* TODO: 여기에 서버에서 id 기반 게시글 데이터 불러와서 표시 */}
    </div>
  );
}

export default Post;