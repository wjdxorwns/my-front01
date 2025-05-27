import {api} from "./http"

//스프링서버에 보낼것들 모아 놓은것



export const login = (m_id, m_pw) =>
  api.post("/members/login", {
    m_id,
    m_pw
  });


export const Signup = (member) =>
  api.post("/members/register", member);