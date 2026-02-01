import axios from "axios";
import * as SecureStore from "expo-secure-store";

// 테스트용 v2 유저 API

const SERVER_URI = process.env.SERVER_URI;

export const usersApiTest = axios.create({
  baseURL: `${SERVER_URI.replace(/\/$/, "")}/v2/users/me`,
  headers: {
    "Content-Type": "application/json",
  },
});

usersApiTest.interceptors.request.use(async (config) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

usersApiTest.interceptors.response.use(
  (response) => response.data,
  (error) =>
    Promise.reject(new Error(error.response?.data?.message || error.message)),
);
