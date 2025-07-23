// pages/CategoryPage.jsx
import { useParams } from "react-router-dom";
import categoryData from "../data/categoryData";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const items = categoryData[categoryName] || [];

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{categoryName} 페이지</h2>
      {items.length > 0 ? (
        <ul>
            {items.map((item, idx)=>(
                <li key = {idx}>item</li>
            ))}
        </ul>
      ):(
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
}
