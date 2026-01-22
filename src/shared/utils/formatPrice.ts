/**
 * 숫자를 한국 원화 형식으로 포맷팅하는 유틸리티
 *
 * @param price - 숫자 형태의 가격
 * @returns "20,000원" 형태의 포맷팅된 문자열
 *
 * @example
 * formatPrice(20000) // "20,000원"
 * formatPrice(5000) // "5,000원"
 */
export const formatPrice = (price: number): string => {
  return `${price.toLocaleString("ko-KR")}원`;
};
