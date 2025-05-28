import { Link, useLocation, useNavigate } from "react-router-dom";
import '../styles/header.css';
import { useEffect, useState } from "react";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const name = localStorage.getItem("name");
  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("m_idx");
    setIsLoggedIn(false);
    navigate("/");
    // 리디렉션 하려면 navigate 사용
};

// 마운트 시 로그인 상태 확인
useEffect(() => {
  const m_idx = localStorage.getItem("m_idx");
  console.log("Header useEffect 실행됨. m_idx:", m_idx);
  setIsLoggedIn(!!m_idx); 
}, [location]);

console.log("Header 렌더링. isLoggedIn:", isLoggedIn);


  return (
    <header className="header">
      <div className="header-inner">
        {/* 왼쪽 : 로고 */}
        <div className="header-left">
          <Link to="/" className="logo-link">
            <img className="logo-image" src="/imgs/logo.png" alt="한국 ICT" />
          </Link>
        </div>

        {/* 가운데 : 방명록, 게시판, 고객센터 */}
        <div className="header-center">
          <Link to="/guestbook"> 방명록 </Link>
          <Link to="/bbs"> 게시판 </Link>
          <Link to="/support"> 고객센터 </Link>
        </div>

        {/* 오른쪽 : 로그인, 회원가입, 로그아웃 */}
        <div className="header-right">
          {isLoggedIn ? (
              <>
            <button onClick={handleLogout}>로그아웃</button>
            <Link to="/mypage">마이페이지</Link>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/signup">회원가입</Link>
            </>
          )}
        </div>
        
       {isLoggedIn && name && <p>{name} 님 환영합니다</p>}
        
      </div>
    </header>
  );
}
