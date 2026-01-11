import ExpoModulesCore
import KakaoSDKCommon
import KakaoSDKAuth
import KakaoSDKUser

public class KakaoLoginModule: Module {
  public func definition() -> ModuleDefinition {
    Name("KakaoLogin")

    AsyncFunction("login") { (promise: Promise) in
      // 카카오톡 앱이 설치되어 있으면 카카오톡으로 로그인
      if UserApi.isKakaoTalkLoginAvailable() {
        UserApi.shared.loginWithKakaoTalk { (oauthToken, error) in
          if let error = error {
            promise.reject("KAKAO_LOGIN_ERROR", error.localizedDescription)
          } else if let token = oauthToken {
            promise.resolve(token.accessToken)
          }
        }
      } else {
        // 카카오톡 앱이 없으면 카카오 계정(웹뷰)으로 로그인
        UserApi.shared.loginWithKakaoAccount { (oauthToken, error) in
          if let error = error {
            promise.reject("KAKAO_LOGIN_ERROR", error.localizedDescription)
          } else if let token = oauthToken {
            promise.resolve(token.accessToken)
          }
        }
      }
    }
  }
}
