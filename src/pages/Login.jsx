import { useState } from "react";
import Button from "../components/Button";

export default function Login() {
    const handleLogin = async()=>{
        //엑시온으로 스프링 부트 서버에 post로 요청
    }

    const [m_id,setM_id] =useState('');
     const [m_pw,setM_pw] =useState('');
    return (
  
        
    <div>
        <h1>로그인</h1>
        <div>
            <p>
            <label>아이디</label>
            <input type="text"
             value={m_id} onChange={(e)=>
                    setM_id(e.target.value)
             }
              style={{margin:"5px;", padding:"5px;"}}></input>
              </p>
            <p>
            <label>비밀번호</label>
            <input type="password" 
            value={m_pw} onChange={(e)=>setM_pw(e.target.value)} 
            style={{margin:"5px;" , padding:"5px;"}}></input>
            </p>
            <Button text="로그인" onClick={handleLogin}></Button>
            <Button text="회원가입"></Button>
        </div>
    </div>
  );
}