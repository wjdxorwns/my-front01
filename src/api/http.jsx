import axios from "axios";

// axios 인스턴스 생성 (makeup)
export const makeupApi = axios.create({
    baseURL: process.env.REACT_APP_MAKEUP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});



//스프링 서버에 가는 axios 인스턴스 생성 
export const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,   // CORS 허용
});



