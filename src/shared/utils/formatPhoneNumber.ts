/**
 * 전화번호를 하이픈 포함 형식으로 포맷팅하는 유틸리티
 *
 * @param value - 입력된 전화번호 문자열
 * @returns "010-1234-5678" 형태의 포맷팅된 문자열
 *
 * @example
 * formatPhoneNumber("01012345678") // "010-1234-5678"
 * formatPhoneNumber("0101234") // "010-1234"
 * formatPhoneNumber("010") // "010"
 */
export const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/[^0-9]/g, "");

  if (numbers.length <= 3) {
    return numbers;
  }

  if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  }

  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};
