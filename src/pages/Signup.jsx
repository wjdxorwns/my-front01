import { useState } from 'react';
import '../styles/login.css';
import { register } from '../api/auth'; 
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    m_id: '',
    m_pw: '',
    m_name: '',
    m_email: '',
    m_phone: '',
    m_addr: '',
    m_addr2: '',
  });

  const [isVerified, setIsVerified] = useState(false);
  const [canVerify, setCanVerify] = useState(false);
  const [code, setCode] = useState('');
  const [sentCode, setSentCode] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendCode = () => {
    if (!form.m_email) return;

    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    alert(`(테스트용) 인증코드: ${randomCode}`);
    setSentCode(randomCode);
    setCanVerify(true);
  };

  const handleVerifyCode = () => {
    if (code === sentCode) {
      alert("인증 성공!");
      setIsVerified(true);
    } else {
      alert("인증 실패. 코드를 확인해주세요.");
    }
  };

  const handleSignup = async () => {
    console.log("회원가입 정보:", form);
    
    try {
      const response = await register(form); // ✅ 실제 POST 요청
      console.log("서버 응답:", response.data);

      if (response.data.success) {
        alert("회원가입 성공!");
        // TODO: 리디렉션 또는 초기화 가능
         navigate('/login');
      } else {
        alert("회원가입 실패: " + response.data.message);
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      alert("서버 오류 발생");
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-box" onSubmit={(e) => e.preventDefault()}>
        <div className="email-row">
          <input
            type="text"
            name="m_email"
            placeholder="이메일 입력하세요"
            value={form.m_email}
            onChange={handleChange}
          />
          <button type="button" onClick={handleSendCode} disabled={!form.m_email}>
            인증메일 보내기
          </button>
        </div>

        {canVerify && (
          <div className="email-row">
            <input
              type="text"
              placeholder="인증코드 입력"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button type="button" onClick={handleVerifyCode}>
              인증 확인
            </button>
          </div>
        )}

        <input type="text" name="m_id" placeholder="아이디" value={form.m_id} onChange={handleChange} />
        <input type="password" name="m_pw" placeholder="비밀번호" value={form.m_pw} onChange={handleChange} />
        <input type="text" name="m_name" placeholder="이름" value={form.m_name} onChange={handleChange} />
        <input type="tel" name="m_phone" placeholder="전화번호" value={form.m_phone} onChange={handleChange} />
        <input type="text" name="m_addr" placeholder="주소" value={form.m_addr} onChange={handleChange} />
        <input type="text" name="m_addr2" placeholder="상세주소" value={form.m_addr2} onChange={handleChange} />

        <button type="submit" onClick={handleSignup} disabled={!isVerified}>
          회원가입
        </button>
      </form>
    </div>
  );
}
