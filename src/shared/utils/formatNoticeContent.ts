/**
 * 공지사항 HTML 문자열을 줄바꿈 텍스트로 변환하는 유틸리티
 *
 * @param noticeContent - "<p>신분증 지참</p><p>열파참</p>" 형태의 공지 문자열
 * @returns "신분증 지참\n열파참" 형태의 줄바꿈 텍스트
 *
 * @example
 * formatNoticeContent("<p>신분증 지참</p><p>열파참</p>") // "신분증 지참\n열파참"
 */
export const formatNoticeContent = (noticeContent: string): string => {
  return noticeContent
    .split(/<\/p>/)
    .map((line) => line.replace(/<p>/g, "").trim())
    .filter(Boolean)
    .join("\n");
};
