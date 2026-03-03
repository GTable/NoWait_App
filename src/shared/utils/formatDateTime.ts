/**
 * ISO 형태 일시 문자열을 "YYYY.MM.DD HH:mm" 형식으로 변환한다.
 *
 * @param dateTime - 예: "2026-02-13T19:18:11.801567"
 * @returns 예: "2026.02.13 19:18"
 */
export const formatDateTime = (dateTime: string): string => {
  if (!dateTime) {
    return dateTime;
  }

  const match = dateTime.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/,
  );

  if (!match) {
    return dateTime;
  }

  const [, year, month, day, hour, minute] = match;
  return `${year}.${month}.${day} ${hour}:${minute}`;
};
