import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/http";

export default function GuestbookDetail() {
  const { gb_idx } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    gb_subject: "",
    gb_content: "",
    gb_name: "",
    gb_email: "",
    gb_f_name: ""
  });
  const [password, setPassword] = useState("");

  const fetchDetail = async () => {
    try {
      const res = await api.get(`/guestbook/guestbookdetail?gb_idx=${gb_idx}`);
      if (res.data.success) {
        setForm(res.data.data);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("불러오기 실패");
    }
  };

  const handleUpdate = async () => {
    try {
      const confirm = window.confirm("정말 수정하시겠습니까?");
      if (!confirm) return;

      await api.post("/guestbook/guestbookupdate", {
        ...form,
        gb_idx,
        gb_pw: password,
      });

      alert("수정 완료");
      navigate("/guestbook");
    } catch (err) {
      console.error(err);
      alert("수정 실패 또는 비밀번호 불일치");
    }
  };

  const handleDelete = async () => {
    try {
      const confirm = window.confirm("정말 삭제하시겠습니까?");
      if (!confirm) return;

      await api.get(`/guestbook/guestbookdelete?gb_idx=${gb_idx}&gb_pw=${password}`);
      alert("삭제 완료");
      navigate("/guestbook");
    } catch (err) {
      console.error(err);
      alert("삭제 실패 또는 비밀번호 불일치");
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">📝 방명록 수정/삭제</h1>

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

      <input
     
        placeholder="작성자"
        value={form.gb_name}
        readOnly
      />

      <input
       
        placeholder="이메일"
        value={form.gb_email}
        readOnly
      />

      {form.gb_f_name && (
        <p >첨부파일: {form.gb_f_name}</p>
      )}

      <input
        type="password"
     
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          onClick={handleUpdate}
        >
          수정
        </button>
        <button
          onClick={handleDelete}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
