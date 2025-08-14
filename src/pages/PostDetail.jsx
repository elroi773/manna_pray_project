// src/pages/PostDetail.jsx 
import React, { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom"; 
import { supabase } from "../supabaseClient"; 
 
export default function PostDetail() { 
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [post, setPost] = useState(null); 
 
  useEffect(() => { 
    const fetchPost = async () => { 
      const { data: postData, error } = await supabase 
        .from("posts") 
        .select("*") 
        .eq("id", id) 
        .single(); 
 
      if (!error && postData) { 
        setPost(postData); 
      } else { 
        console.error("게시글 불러오기 실패:", error); 
      } 
    }; 
 
    fetchPost(); 
  }, [id]); 
 
  if (!post) 
    return ( 
      <div style={{ 
        textAlign: "center", 
        padding: "60px 20px", 
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
      }}> 
        <div style={{
          padding: "40px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "20px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)"
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            border: "4px solid #e2e8f0",
            borderTop: "4px solid #6366f1",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px"
          }}></div>
          <div style={{
            fontSize: "18px",
            color: "#4a5568",
            fontWeight: "500"
          }}>
            게시글을 불러오는 중...
          </div>
        </div>
      </div> 
    ); 
 
  return ( 
    <div 
      style={{ 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "40px 20px", 
        display: "flex", 
        justifyContent: "center", 
      }} 
    > 
      <div 
        style={{ 
          maxWidth: "900px", 
          width: "100%", 
          backgroundColor: "rgba(255, 255, 255, 0.95)", 
          borderRadius: "24px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(20px)",
          overflow: "hidden",
          position: "relative"
        }} 
      > 


        <div style={{ padding: "40px" }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ 
              backgroundColor: "rgba(99, 102, 241, 0.1)",
              color: "#6366f1", 
              border: "2px solid rgba(99, 102, 241, 0.2)",
              padding: "12px 24px", 
              borderRadius: "12px", 
              cursor: "pointer", 
              marginBottom: "32px", 
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backdropFilter: "blur(10px)"
            }} 
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#6366f1";
              e.target.style.color = "#ffffff";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 10px 25px rgba(99, 102, 241, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgba(99, 102, 241, 0.1)";
              e.target.style.color = "#6366f1";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          > 
            <span style={{ fontSize: "16px" }}>←</span>
            돌아가기 
          </button> 
   
          {/* 상단 메타 정보 */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            padding: "20px",
            background: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)",
            borderRadius: "16px",
            border: "1px solid rgba(99, 102, 241, 0.1)"
          }}>
            <div>
              <div style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "4px"
              }}>작성자</div>
              <div style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#1f2937"
              }}>{post.author || "익명"}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "4px"
              }}>작성일</div>
              <div style={{
                fontSize: "14px",
                color: "#4b5563"
              }}>
                {new Date(post.created_at).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>

          {/* 카테고리 */}
          <div style={{ marginBottom: "24px" }}>
            <span 
              style={{ 
                display: "inline-flex",
                alignItems: "center",
                background: "linear-gradient(135deg, #ec4899, #be185d)",
                color: "#ffffff", 
                padding: "8px 20px", 
                borderRadius: "25px",
                fontSize: "14px", 
                fontWeight: "600",
                boxShadow: "0 4px 15px rgba(236, 72, 153, 0.3)",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }} 
            > 
              <span style={{ 
                width: "8px", 
                height: "8px", 
                backgroundColor: "rgba(255, 255, 255, 0.7)", 
                borderRadius: "50%", 
                marginRight: "8px" 
              }}></span>
              {post.category} 
            </span> 
          </div>
   
          {/* 제목 */}
          <h1 
            style={{ 
              color: "#111827", 
              marginBottom: "32px", 
              fontSize: "32px",
              fontWeight: "800",
              lineHeight: "1.2",
              background: "linear-gradient(135deg, #1f2937 0%, #4b5563 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              position: "relative",
              textAlign: "left"
            }} 
          > 
            {post.title}
            <div style={{
              position: "absolute",
              bottom: "-8px",
              left: "0",
              width: "60px",
              height: "4px",
              background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
              borderRadius: "2px"
            }}></div>
          </h1> 
   
          {/* 본문 */}
          <div 
            style={{ 
              color: "#374151", 
              fontSize: "17px", 
              lineHeight: "1.8", 
              backgroundColor: "rgba(255, 255, 255, 0.7)", 
              padding: "32px", 
              borderRadius: "20px", 
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.05), 0 4px 20px rgba(0, 0, 0, 0.05)",
              whiteSpace: "pre-wrap",
              backdropFilter: "blur(10px)",
              position: "relative",
              overflow: "hidden"
            }} 
          > 
            {/* 장식적 요소 */}
            <div style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "100px",
              height: "100px",
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))",
              borderRadius: "50%",
              filter: "blur(20px)"
            }}></div>
            <div style={{
              position: "absolute",
              bottom: "-30px",
              left: "-30px",
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(245, 158, 11, 0.1))",
              borderRadius: "50%",
              filter: "blur(15px)"
            }}></div>
            
            <div style={{ position: "relative", zIndex: 1 }}>
              {post.content}
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS 애니메이션 */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div> 
  ); 
}