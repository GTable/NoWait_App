import { registerWebModule, NativeModule } from 'expo';

class KakaoLoginModule extends NativeModule {
  async login(): Promise<string> {
    throw new Error('Kakao login is not supported on web platform');
  }
}

export default registerWebModule(KakaoLoginModule, 'KakaoLogin');
