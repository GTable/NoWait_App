import { ScreenLayout } from "@/app/layout/ScreenLayout";
import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { formatNoticeContent } from "@/shared/utils/formatNoticeContent";
import { BackHeader } from "@/shared/ui/BackHeader";
import styled from "@emotion/native";

interface NoticeDetailModalProps {
  /** 공지사항 제목 */
  noticeTitle: string;

  /** 공지사항 내용 */
  noticeContent: string;

  onClose?: () => void;
}

export const NoticeDetailModal = ({
  noticeTitle,
  noticeContent,
  onClose,
}: NoticeDetailModalProps) => {
  const formattedNoticeContent = formatNoticeContent(noticeContent);

  return (
    <ScreenLayout>
      <BackHeader title="공지사항" onPress={onClose} />

      <E.Container>
        <E.Content>
          <E.Title>{noticeTitle}</E.Title>
          <E.Description>{formattedNoticeContent}</E.Description>
        </E.Content>
      </E.Container>
    </ScreenLayout>
  );
};

const E = {
  Container: styled.View({
    flex: 1,
    width: "100%",
    paddingTop: 26,
    paddingHorizontal: 20,
  }),

  Content: styled.View({
    flex: 1,
    flexDirection: "column",
    gap: 16,
  }),

  Title: styled.Text({
    color: colors.black[90],
    ...typography["title-18-bold"],
  }),

  Description: styled.Text({
    flex: 1,
    alignSelf: "stretch",
    color: colors.black[80],
    ...typography["text-16-regular"],
  }),
};
