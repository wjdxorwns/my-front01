import { useState } from "react";
import '../styles/login.css'
import { login } from "../api/auth";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login(){
    const [m_id, setM_id] = useState("");
    const [m_pw, setM_pw] = useState("");
    const navigate = useNavigate(); 

    const handleLogin = async()=>{
        // Axios로 SpringBoot 서버에 POST로 요청
        try {
          const response =await login(m_id,m_pw);
          console.log(response);

          
          localStorage.setItem("token","admin")
          navigate('/');
          //로그인 성공하면 home으로 이동
          //단 이동 전에 로그인 성공했다고 기억해야한다
        } catch (error) {
          console.log(error)
          alert("로그인 실패")
        }
    }
    return(
 
        <div className="login-wrapper">
  <div className="login-box">
    <input
      type="text"
      value={m_id}
      onChange={(e) => setM_id(e.target.value)}
      placeholder="아이디를 입력하세요"
    />

    <input
      type="password"
      value={m_pw}
      onChange={(e) => setM_pw(e.target.value)}
      placeholder="비밀번호를 입력하세요"
    />

    <button
      onClick={handleLogin}
      disabled={!m_id || !m_pw}
    >
      로그인
    </button>
  </div>
</div>

    )
}