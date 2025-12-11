import KakaoLoginModule from "./src/KakaoLoginModule";

export async function login(): Promise<string> {
  return await KakaoLoginModule.login();
}

export { default } from "./src/KakaoLoginModule";
