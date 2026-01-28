import { useCallback, useMemo, useState } from "react";

interface TermItem {
  id: string;
  text: string;
  checked: boolean;
  onPress: () => void;
  onDetailPress: () => void;
}

/**
 * 약관 동의 상태 관리 훅
 * - 개별 약관 체크 상태 관리 (서비스 이용약관, 개인정보 처리방침, 마케팅 동의)
 * - 전체 동의 체크박스 처리
 * - 필수 약관(term1, term2) 체크 여부 확인
 */
export const useTermsAgreement = () => {
  const [termsChecked, setTermsChecked] = useState<Record<string, boolean>>({
    term1: false,
    term2: false,
    term3: false,
  });

  const allChecked = Object.values(termsChecked).every(Boolean);

  const handleAllCheck = () => {
    const newValue = !allChecked;
    setTermsChecked({
      term1: newValue,
      term2: newValue,
      term3: newValue,
    });
  };

  const handleTermPress = useCallback((termKey: string) => {
    setTermsChecked((prev) => ({ ...prev, [termKey]: !prev[termKey] }));
  }, []);

  const terms: TermItem[] = useMemo(
    () => [
      {
        id: "service",
        text: "[필수] 서비스 이용약관",
        checked: termsChecked.term1,
        onPress: () => handleTermPress("term1"),
        onDetailPress: () => {},
      },
      {
        id: "privacy",
        text: "[필수] 개인정보 처리방침",
        checked: termsChecked.term2,
        onPress: () => handleTermPress("term2"),
        onDetailPress: () => {},
      },
      {
        id: "marketing",
        text: "[선택] 마케팅 정보 수신 동의",
        checked: termsChecked.term3,
        onPress: () => handleTermPress("term3"),
        onDetailPress: () => {},
      },
    ],
    [termsChecked, handleTermPress],
  );

  // 필수 약관(term1, term2)이 모두 체크되었는지 확인
  const isRequiredTermsChecked = termsChecked.term1 && termsChecked.term2;

  // 마케팅 동의 여부 (선택 약관)
  const isMarketingAgreed = termsChecked.term3;

  return {
    terms,
    allChecked,
    handleAllCheck,
    isRequiredTermsChecked,
    isMarketingAgreed,
  };
};
