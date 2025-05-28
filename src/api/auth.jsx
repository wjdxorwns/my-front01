import {api} from "./http"

//스프링서버에 보낼것들 모아 놓은것



export const login = (m_id, m_pw) =>
  api.post("/members/login", {
    m_id,
    m_pw
  });


export const register = (form) =>
  api.post("/members/register", form);

export const mypage = (m_idx) =>
  api.get(`/members/detail_list`, {
    params: { m_idx }
  });