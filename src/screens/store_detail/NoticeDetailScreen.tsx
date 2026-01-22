import { RootStackParamList } from "@/app/config/routes/routes.core";
import { NoticeDetailModal } from "@/features/store_detail/components/NoticeDetailModal";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";

type NoticeDetailRouteProp = RouteProp<RootStackParamList, "NoticeDetail">;

// 공지사항 상세 모달을 네비게이션 화면으로 표시
const NoticeDetailScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  // 라우트 파라미터에서 공지 제목/내용을 가져옴
  const route = useRoute<NoticeDetailRouteProp>();
  const { noticeTitle, noticeContent } = route.params;

  return (
    <NoticeDetailModal
      noticeTitle={noticeTitle}
      noticeContent={noticeContent}
      // 닫기 버튼 클릭 시 이전 화면으로 이동
      onClose={() => navigation.goBack()}
    />
  );
};

export default NoticeDetailScreen;
