import { useCallback, useEffect, useState } from "react";
import { AppState, AppStateStatus, Linking } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

/**
 * 알림 권한 상태 관리
 *
 * - 화면 진입, 앱 포그라운드 복귀 시 권한 자동 확인
 * - 권한 미허용 시 설정 페이지 이동 처리
 */
export const useNotificationPermission = () => {
  const [showNotice, setShowNotice] = useState(false);

  const checkPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setShowNotice(status !== "granted");
  };

  useFocusEffect(
    useCallback(() => {
      checkPermission();
    }, []),
  );

  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (nextState === "active") {
        checkPermission();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );
    return () => subscription.remove();
  }, []);

  const handleOpenSettings = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status === "undetermined") {
      const result = await Notifications.requestPermissionsAsync();
      if (result.status === "granted") {
        setShowNotice(false);
        return;
      }
    }

    Linking.openSettings();
  };

  return { showNotice, handleOpenSettings };
};
