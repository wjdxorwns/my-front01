import { useEffect, useState } from "react";
import axios from "axios";

export default function MyPage() {
  const [member, setMember] = useState(null);

  useEffect(() => {
    const m_idx = localStorage.getItem("m_idx");



    axios
      .get(`http://localhost:8080/api/members/mypage?m_idx=${m_idx}`)
      .then((res) => {
        if (res.data.success) {
          setMember(res.data.data[0]);
        } else {
          alert("회원 정보를 찾을 수 없습니다.");
        }
      })
      .catch((err) => {
        console.error("회원 정보 조회 실패", err);
        alert("서버 오류");
      });
  }, []);

  if (!member) return <p>불러오는 중...</p>;

  return (
    <div>
      <h2>마이페이지</h2>
      <h3>{member.m_name}님 환영합니다다</h3>
      <div>
      <p>아이디: {member.m_id}</p>
      <p>주소소: {member.m_email}</p>
      <p>상세주소: {member.m_addr2}</p>
      <p>전화번호호: {member.m_phone}</p>
      <p>생성일: {member.m_reg}</p>
      </div>
    </div>
  );
}
