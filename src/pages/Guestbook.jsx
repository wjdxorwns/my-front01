import { useEffect, useState } from "react";
import { api } from "../api/http";
import { useNavigate, Link } from "react-router-dom";

export default function Guestbook() {
  const navigate = useNavigate();

  const [guestbooks, setGuestbooks] = useState([]);
  const [fileInput, setFileInput] = useState(null);

  const [form, setForm] = useState({
    gb_name: "",
    gb_subject: "",
    gb_content: "",
    gb_email: "",
    gb_pw: "",
  });

  // ✅ 사용자 정보 자동 입력
  const fetchUserInfo = async () => {
    try {
      const res = await api.get("/members/mypage");
      if (res.data.success) {
        const user = res.data.data;
        setForm((prev) => ({
          ...prev,
          gb_name: user.m_name || "",
          gb_email: user.m_email || "",
          gb_pw: user.m_pw || "", // 암호화 전 평문 비밀번호 (주의!)
        }));
      }
    } catch (err) {
      console.error("사용자 정보 로딩 실패:", err);
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  // ✅ 방명록 목록 불러오기
  const fetchList = async () => {
    try {
      const res = await api.get("/guestbook/guestbooklist");
      if (res.data.success) setGuestbooks(res.data.data || []);
    } catch (err) {
      console.error("방명록 목록 불러오기 실패:", err);
    }
  };

  // ✅ 등록 처리
  const handleSubmit = async () => {
    if (!form.gb_subject.trim() || !form.gb_content.trim()) {
      alert("등록 실패 ㅠㅠ (제목과 내용을 입력해주세요)");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        formData.append(key, val);
      });
      if (fileInput) {
        formData.append("file_name", fileInput);
        console.log("FormData 내용:", [...formData]);
      } else {
        console.log("파일이 선택되지 않음");
      }

      const res = await api.post("/guestbook/guestbookinsert", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("등록 완료");
        setForm((prev) => ({
          ...prev,
          gb_subject: "",
          gb_content: "",
        }));
        setFileInput(null);
        document.querySelector('input[type="file"]').value = "";
        fetchList();
      } else {
        alert("등록 실패 ㅠㅠ: " + res.data.message);
      }
    } catch (err) {
      console.error("등록 중 오류:", err);
      alert("등록 실패 ㅠㅠ: " + err.message);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchList();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">📝 방명록 작성</h1>

      <input
        placeholder="이름"
        value={form.gb_name}
        readOnly
        className="w-full border p-2 mb-2"
      />
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
        placeholder="이메일"
        value={form.gb_email}
        readOnly
        className="w-full border p-2 mb-2"
      />
      <input
        type="hidden"
        value={form.gb_pw}
        readOnly
      />
      <div>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            console.log("선택된 파일:", file);
            setFileInput(file);
          }}
          className="mb-4"
        />
        {fileInput && <p>선택된 파일: {fileInput.name}</p>}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        등록
      </button>

      <h2 className="text-xl font-bold mt-6 mb-2">📃 목록</h2>
      {guestbooks.map((item) => (
        <div key={item.gb_idx} className="border-b py-2">
          <Link
            to={`/guestbook/${item.gb_idx}`}
            className="text-lg font-semibold text-blue-600 hover:underline"
          >
            {item.gb_subject}
          </Link>
          <div className="text-sm text-gray-600">작성자: {item.gb_name}</div>
        </div>
      ))}
    </div>
  );
}