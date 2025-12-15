package expo.modules.kakaologin

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise

import com.kakao.sdk.user.UserApiClient

class KakaoLoginModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("KakaoLogin")

    AsyncFunction("login") { promise: Promise -> 
      val context = appContext.reactContext

      // Context가 없을 경우 안전하게 방어
      if (context == null) {
        promise.reject("CONTEXT_ERROR", "Activity Context is null", null)
        return@AsyncFunction
      }

      if (UserApiClient.instance.isKakaoTalkLoginAvailable(context)) {
        // 1. 카카오톡 앱이 설치되어 있으면 -> 앱으로 로그인
        UserApiClient.instance.loginWithKakaoTalk(context) { token, error ->
          if (error != null) {
            // 사용자가 취소했거나 에러가 난 경우
            promise.reject("KAKAO_LOGIN_ERROR", error.message, error)
          } else if (token != null) {
            promise.resolve(token.accessToken)
          }
        }
      } else {
        // 2. 카카오톡 앱이 없으면 -> 카카오 계정(웹뷰)으로 로그인
        UserApiClient.instance.loginWithKakaoAccount(context) { token, error ->
          if (error != null) {
            promise.reject("KAKAO_LOGIN_ERROR", error.message, error)
          } else if (token != null) {
            promise.resolve(token.accessToken)
          }
        }
      }
    }
  }
}