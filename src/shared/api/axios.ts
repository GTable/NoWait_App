import axios from "axios";

const SERVER_URI = process.env.SERVER_URI;

export const api = axios.create({
  baseURL: SERVER_URI.replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 요청 전 헤더 추가 및 전처리
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 응답 데이터 추출 및 에러 메시지 처리
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message;
    return Promise.reject(new Error(errorMessage));
  }
);
