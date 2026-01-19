const { withAppDelegate, withPodfile } = require("@expo/config-plugins");

// AppDelegate.swift에 Kakao SDK 초기화 코드 추가
function withKakaoAppDelegate(config) {
  return withAppDelegate(config, (config) => {
    let contents = config.modResults.contents;

    // KakaoSDKCommon import 추가
    if (!contents.includes("import KakaoSDKCommon")) {
      contents = contents.replace(
        "import Expo",
        "import Expo\nimport KakaoSDKCommon"
      );
    }

    // Kakao SDK 초기화 코드 추가
    if (!contents.includes("KakaoSDK.initSDK")) {
      const initCode = `
    if let appKey = Bundle.main.object(forInfoDictionaryKey: "KAKAO_NATIVE_APP_KEY") as? String {
      KakaoSDK.initSDK(appKey: appKey)
    }
`;
      // delegate.dependencyProvider 설정 후에 추가
      contents = contents.replace(
        "delegate.dependencyProvider = RCTAppDependencyProvider()",
        `delegate.dependencyProvider = RCTAppDependencyProvider()
${initCode}`
      );
    }

    config.modResults.contents = contents;
    return config;
  });
}

// Podfile에 Kakao SDK 검색 경로 설정 추가
function withKakaoPodfile(config) {
  return withPodfile(config, (config) => {
    let contents = config.modResults.contents;

    const kakaoPostInstall = `

    # Kakao SDK는 메인 앱 프로젝트에서 SwiftPM으로 관리됨
    # KakaoLogin pod에서 import할 수 있도록 검색 경로만 설정
    pods_project = installer.pods_project
    kakao_target = pods_project.targets.find { |t| t.name == 'KakaoLogin' }
    if kakao_target
      kakao_target.build_configurations.each do |config|
        extra_paths = [
          '$(BUILD_DIR)/$(CONFIGURATION)$(EFFECTIVE_PLATFORM_NAME)',
          '$(BUILD_DIR)/$(CONFIGURATION)$(EFFECTIVE_PLATFORM_NAME)/PackageFrameworks',
        ]

        framework_paths = config.build_settings['FRAMEWORK_SEARCH_PATHS'] || '$(inherited)'
        framework_paths = Array(framework_paths)
        extra_paths.each { |path| framework_paths << path unless framework_paths.include?(path) }
        config.build_settings['FRAMEWORK_SEARCH_PATHS'] = framework_paths

        swift_include_paths = config.build_settings['SWIFT_INCLUDE_PATHS'] || '$(inherited)'
        swift_include_paths = Array(swift_include_paths)
        extra_paths.each { |path| swift_include_paths << path unless swift_include_paths.include?(path) }
        config.build_settings['SWIFT_INCLUDE_PATHS'] = swift_include_paths
      end
    end`;

    // post_install 블록 안에 추가 (이미 있으면 추가하지 않음)
    if (!contents.includes("KakaoLogin pod에서 import")) {
      // react_native_post_install 호출의 닫는 괄호 뒤에 추가
      const startMarker = "react_native_post_install(";
      const startIndex = contents.indexOf(startMarker);

      if (startIndex !== -1) {
        let parenCount = 0;
        let endIndex = -1;

        for (let i = startIndex + startMarker.length - 1; i < contents.length; i++) {
          if (contents[i] === "(") {
            parenCount++;
          } else if (contents[i] === ")") {
            parenCount--;
            if (parenCount === 0) {
              endIndex = i;
              break;
            }
          }
        }

        if (endIndex !== -1) {
          contents = contents.slice(0, endIndex + 1) + kakaoPostInstall + contents.slice(endIndex + 1);
        }
      }
    }

    config.modResults.contents = contents;
    return config;
  });
}

// 메인 플러그인 함수
// Info.plist 설정은 app.json의 ios.infoPlist에서 처리됨
function withKakaoSDK(config) {
  config = withKakaoAppDelegate(config);
  config = withKakaoPodfile(config);
  return config;
}

module.exports = withKakaoSDK;
