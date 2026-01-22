/**
 * 영업시간 문자열을 포맷팅하는 유틸리티
 *
 * @param openTime - "00002359" 형태의 영업시간 문자열 (시작시간 4자리 + 종료시간 4자리)
 * @returns "00:00 - 23:59" 형태의 포맷팅된 문자열
 *
 * @example
 * formatOpenTime("00002359") // "00:00 - 23:59"
 * formatOpenTime("10002200") // "10:00 - 22:00"
 */
export const formatOpenTime = (openTime: string): string => {
  if (!openTime || openTime.length !== 8) {
    return openTime;
  }

  const startHour = openTime.slice(0, 2);
  const startMinute = openTime.slice(2, 4);
  const endHour = openTime.slice(4, 6);
  const endMinute = openTime.slice(6, 8);

  return `${startHour}:${startMinute} - ${endHour}:${endMinute}`;
};
