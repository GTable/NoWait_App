import { NativeModule, requireNativeModule } from 'expo';

declare class KakaoLoginModule extends NativeModule {
  login(): Promise<string>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<KakaoLoginModule>('KakaoLogin');
