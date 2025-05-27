import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeupApi } from "../api/http";
import '../styles/productdetail.css'
export default function ProductDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await makeupApi.get('/v1/products.json?brand=maybelline');
        const item = response.data.find((k) => k.id == id); // 느슨한 비교
        if (!item) throw new Error("해당 상품을 찾을 수 없습니다.");
        setProduct(item);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  if (loading) return <div style={{ textAlign: "center" }}>로딩 중....</div>;
  if (error) return <div style={{ textAlign: "center", color: 'red' }}>Error: {error}</div>;

  return (
    <div className="detail-container">
  <h2>{product.name}</h2>
  {product.image_link && (
    <img src={product.image_link} alt={product.name} />
  )}
  <p className="detail-info"><strong>브랜드 :</strong> {product.brand}</p>
  <p className="detail-info"><strong>카테고리 :</strong> {product.category}</p>
  <p className="detail-info"><strong>제품 타입 :</strong> {product.product_type}</p>
  <p className="detail-info"><strong>가격 :</strong> ${product.price}</p>
</div>
  );
}
