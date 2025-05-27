import axios from "axios";

// 내부 API (localhost:8080)
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 외부 API (Makeup API)
export const makeupApi = axios.create({
  baseURL: process.env.REACT_APP_MAKEUP_API_BASE_URL + "/v1",
  headers: {
    'Content-Type': 'application/json'
  }
});