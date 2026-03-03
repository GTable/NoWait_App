/**
 * 예약 번호 문자열에서 화면 표시용 대기 번호를 추출한다.
 * - "20260213-8-0001" -> "1"
 * - "0018" -> "18"
 *
 * @param waitingId - 예약 번호 원본
 * @returns 화면에 표시할 대기 번호 문자열
 */
export const formatWaitingNumber = (
  waitingId: string | number,
): string => {
  const raw = String(waitingId).trim();
  if (!raw) {
    return raw;
  }

  const tail = raw.includes("-") ? (raw.split("-").pop() ?? raw) : raw;
  const digitsOnly = tail.replace(/\D/g, "");
  if (!digitsOnly) {
    return tail;
  }

  const parsed = Number.parseInt(digitsOnly, 10);
  if (Number.isNaN(parsed)) {
    return tail;
  }

  return String(parsed);
};
