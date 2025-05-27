import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div>

        <div className="header-left">
          <Link to="/" className="logo-link">
            <img className="logo-name" src="imgs/logo.png" alt="한국 ict" />
          </Link>
        </div>

        <div className="header-center">
          <Link to="/guestbook" >방명록</Link>
          <Link to="/bbs" >게시판</Link>
          <Link to="/support" >고객센터</Link>
        </div>

        <div className="header-right">
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </div>
        
      </div>
    </header>
  );
}
