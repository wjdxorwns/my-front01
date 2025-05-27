import { Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { makeupApi } from "../api/http";
import { Link } from "react-router-dom";

export default function Main() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      setLoading(true);
        const response = await makeupApi.get("/products.json?brand=maybelline");
    setList(response.data);
      console.log(response.data); // 확인용
    } catch (err) {
      console.error(err);
      setError(err.message); // ✅ 오타 수정
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ✅ 로딩 및 에러 상태 표시 (선택)
  if (loading) return <p>로딩 중입니다...</p>;
  if (error) return <p>에러 발생: {error}</p>;

  return (
    <div>
      <h2 style={{textAlign:"center"}}>베스트 상품</h2>
      <Divider />
      <Grid container spacing={2} justifyContent={"center"}>
        {list.map((k) => (
          <Grid item xs={12} sm={6} md={3} key={k.id} style={{textAlign:"center"}}>
            <Link to={`/productdetail/${k.id}`} style={{textDecoration:"none" ,color:"inherit"}}>
            <div>
              <img src={k.image_link}alt={k.name} className="img_item" ></img>
              <strong style={{color:"blue"}}>{k.name}</strong>
              <div>{k.product_type}</div>
              <strong>{k.price}</strong>
            </div>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
