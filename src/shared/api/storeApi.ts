import axios from "axios";
import * as SecureStore from "expo-secure-store";

// 주점 공통 API입니다.

const SERVER_URI = process.env.SERVER_URI;

export const storeApi = axios.create({
  baseURL: `${SERVER_URI.replace(/\/$/, "")}/v1/stores`,
  headers: {
    "Content-Type": "application/json",
  },
});

storeApi.interceptors.request.use(async (config) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

storeApi.interceptors.response.use(
  (response) => response.data,
  (error) =>
    Promise.reject(new Error(error.response?.data?.message || error.message)),
);
