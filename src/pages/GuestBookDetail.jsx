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
    gb_f_name: "",
  });

  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null); // ⬅️ 새로 업로드할 파일

  // 방명록 상세정보 가져오기
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

      const formData = new FormData();
      formData.append("gb_idx", gb_idx);
      formData.append("gb_subject", form.gb_subject);
      formData.append("gb_content", form.gb_content);
      formData.append("gb_pw", password);
      if (file) formData.append("file", file);

      const res = await api.post("/guestbook/guestbookupdate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("수정 완료");
        navigate("/guestbook");
      } else {
        alert(`수정 실패: ${res.data.message || "비밀번호 불일치 또는 서버 오류"}`);
      }
    } catch (err) {
      console.error(err);
      alert("수정 실패: 서버 통신 오류");
    }
  };


  const handleDelete = async () => {
    try {
      const confirm = window.confirm("정말 삭제하시겠습니까?");
      if (!confirm) return;

      const res = await api.get(
        `/guestbook/guestbookdelete?gb_idx=${gb_idx}&gb_pw=${password}`
      );

      if (res.data.success) {
        alert("삭제 완료");
        navigate("/guestbook");
      } else {
        alert(`삭제 실패: ${res.data.message || "비밀번호 불일치 또는 서버 오류"}`);
      }
    } catch (err) {
      console.error(err);
      alert("삭제 실패: 서버 통신 오류");
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
        className="w-full border p-2 mb-2"
      />

      <textarea
        placeholder="내용"
        value={form.gb_content}
        onChange={(e) => setForm({ ...form, gb_content: e.target.value })}
        className="w-full border p-2 mb-2"
      />

      <input
        placeholder="작성자"
        value={form.gb_name}
        readOnly
        className="w-full border p-2 mb-2"
      />

      <input
        placeholder="이메일"
        value={form.gb_email}
        readOnly
        className="w-full border p-2 mb-2"
      />

      {/* 기존 파일 다운로드 */}
  {form.gb_f_name && (
  <p className="text-sm mb-2">
    첨부파일:{" "}
    <a
      href={`http://localhost:8080/api/guestbook/download?gb_idx=${gb_idx}`}
      //  download={form.gb_f_name}
      className="text-blue-600 underline"
    >
      {form.gb_f_name}
    </a>
  </p>
)}

      {/* 새 파일 업로드 */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full border p-2 mb-4"
      />

      {/* 비밀번호 입력 */}
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 mb-4"
      />

      <div className="flex gap-2">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          수정
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          삭제
        </button>
      </div>
    </div>
  );
}