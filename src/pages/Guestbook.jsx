import React, { useState, useEffect } from "react";
import { api } from "../api/http";
import { useNavigate, Link } from "react-router-dom";

function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(payload);
  } catch (e) {
    return null;
  }
}

export default function Guestbook() {
  const navigate = useNavigate();
  const [guestbooks, setGuestbooks] = useState([]);
  const [fileInput, setFileInput] = useState(null);

  // 🔑 토큰에서 유저 정보 추출
  const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");
  const payload = parseJwt(tokens.accessToken);
  const userName = payload?.m_name || "";
  const userEmail = payload?.m_email || "";

  const [form, setForm] = useState({
    gb_name: userName,
    gb_subject: "",
    gb_content: "",
    gb_email: userEmail,
    gb_pw: "",
  });

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await api.get("/guestbook/guestbooklist");
      if (res.data.success) setGuestbooks(res.data.data || []);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) navigate("/login");
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => formData.append(key, val));
      if (fileInput) formData.append("file_name", fileInput);

      await api.post("/guestbook/guestbookinsert", formData);
      alert("등록 완료");
      setForm({
        gb_name: userName,
        gb_subject: "",
        gb_content: "",
        gb_email: userEmail,
        gb_pw: "",
      });
      setFileInput(null);
      fetchList();
    } catch (err) {
      console.error(err);
      alert("등록 실패");
    }
  };

  return (
    <div>
      <h1>📒 게시글 작성</h1>
      <input
        placeholder="제목"
        value={form.gb_subject}
        onChange={(e) => setForm({ ...form, gb_subject: e.target.value })}
      />
      <textarea
        placeholder="내용"
        value={form.gb_content}
        onChange={(e) => setForm({ ...form, gb_content: e.target.value })}
      />
      <input placeholder="작성자" value={form.gb_name} readOnly />
      <input placeholder="이메일" value={form.gb_email} readOnly />
      <input
        type="password"
        placeholder="비밀번호"
        value={form.gb_pw}
        onChange={(e) => setForm({ ...form, gb_pw: e.target.value })}
      />
      <input type="file" onChange={(e) => setFileInput(e.target.files[0])} />
      <button onClick={handleSubmit}>등록</button>

      <h2>📃 게시글 목록</h2>
      {guestbooks.map((item) => (
        <div key={item.gb_idx}>
          <Link to={`/guestbook/${item.gb_idx}`}>{item.gb_subject}</Link>
          <div>작성자: {item.gb_name}</div>
        </div>
      ))}
    </div>
  );
}