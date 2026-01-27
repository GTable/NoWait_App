import { useState } from "react";

/**
 * 전화번호 입력 폼 상태 관리 훅
 * - 전화번호 입력값 관리
 * - 입력 완료 여부 확인 (13자: 010-1234-5678)
 * - 입력값 초기화 기능
 */
export const usePhoneNumberForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleClear = () => {
    setPhoneNumber("");
  };

  // 전화번호가 완전히 입력되었는지 확인 (010-1234-5678 = 13자)
  const isPhoneNumberComplete = phoneNumber.length === 13;

  return {
    phoneNumber,
    setPhoneNumber,
    handleClear,
    isPhoneNumberComplete,
  };
};
