import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScreenLayout } from "@/app/layout/ScreenLayout";
import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { AlertFill } from "@/shared/assets/images";
import { BackHeader } from "@/shared/ui/BackHeader";
import { AlertItem } from "@/features/alert/components/AlertItem";
import { useNotificationPermission } from "@/features/alert/hooks/useNotificationPermission";
import styled from "@emotion/native";

const ALERT_ITEMS = Array.from({ length: 15 }, (_, index) => ({
  storeName: `스페이시스 ${index + 1}`,
  timeLeft: `${index + 1}분 전`,
  message: "지금 입장해 주세요.",
  isRead: index % 2 === 1,
}));

const SCROLL_CONTENT_STYLE = {
  paddingBottom: 20,
};

const AlertScreen = () => {
  const navigation = useNavigation();
  const [alertItems, setAlertItems] = useState(ALERT_ITEMS);
  const { showNotice, handleOpenSettings } = useNotificationPermission();

  const handleRead = (index: number) => {
    setAlertItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, isRead: true } : item)),
    );
  };

  return (
    <ScreenLayout bottomSafeArea={false}>
      <BackHeader onPress={() => navigation.goBack()} />

      <E.ScrollArea
        showsVerticalScrollIndicator={false}
        contentContainerStyle={SCROLL_CONTENT_STYLE}
      >
        <E.TitleText>알림</E.TitleText>

        {/* 알림 권한 안내 배너 */}
        {showNotice && (
          <E.NoticeSection>
            <E.NoticeContainer>
              <E.NoticeLeft>
                <AlertFill />
                <E.NoticeText>휴대폰의 앱 알림이 꺼져있어요</E.NoticeText>
              </E.NoticeLeft>

              <E.SettingsButton onPress={handleOpenSettings}>
                <E.SettingsButtonText>알림 켜기</E.SettingsButtonText>
              </E.SettingsButton>
            </E.NoticeContainer>
          </E.NoticeSection>
        )}

        {/* 알림 목록 */}
        {alertItems.map((item, index) => (
          <AlertItem
            key={`${item.storeName}-${item.timeLeft}-${index}`}
            storeName={item.storeName}
            timeLeft={item.timeLeft}
            message={item.message}
            isRead={item.isRead}
            onPress={() => handleRead(index)}
          />
        ))}
      </E.ScrollArea>
    </ScreenLayout>
  );
};

export default AlertScreen;

const E = {
  TitleText: styled.Text({
    paddingTop: 5,
    paddingLeft: 20,
    paddingBottom: 10,
    color: colors.black[90],
    ...typography["headline-22-bold"],
  }),

  NoticeSection: styled.View({
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  }),

  NoticeContainer: styled.View({
    width: "100%",
    paddingHorizontal: 16,
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.02)",
    backgroundColor: colors.black[5],
  }),

  NoticeLeft: styled.View({
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  }),

  NoticeText: styled.Text({
    color: colors.black[70],
    ...typography["text-14-regular"],
  }),

  SettingsButton: styled.Pressable({
    alignItems: "center",
    justifyContent: "center",
  }),

  SettingsButtonText: styled.Text({
    color: colors.primary,
    ...typography["text-14-medium"],
  }),

  ScrollArea: styled.ScrollView({
    flex: 1,
  }),
};
