import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/config/routes/routes.core";
import { useState, useEffect } from "react";
import { getWaitingCountTest } from "../test/WaitingCountApi.test";
import { registerWaitingTest } from "../test/WaitingRegisterApi.test";
import { useIdempotencyKey } from "./useIdempotencyKey";

interface WaitingInfo {
  waitingCount: number;
  boothName: string;
}

interface UseConfirmWaitingProps {
  /** 주점 공개 코드 */
  publicCode: string;
  /** 입장 인원 수 */
  partySize: number;
}

type ConfirmWaitingNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ConfirmWaiting"
>;

/**
 * 대기 등록 확인 화면 로직 관리 hook
 * - 실시간 대기 정보 조회 (대기 팀 수, 부스 이름)
 * - 대기 등록 API 호출 (멱등성 키 포함)
 * - 네비게이션 핸들러
 */
export const useConfirmWaiting = ({
  publicCode,
  partySize,
}: UseConfirmWaitingProps) => {
  const navigation = useNavigation<ConfirmWaitingNavigationProp>();
  const [waitingInfo, setWaitingInfo] = useState<WaitingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const getIdempotencyKey = useIdempotencyKey();

  // 화면 진입 시 최신 대기 정보 조회
  useEffect(() => {
    let isMounted = true;

    const fetchWaitingInfo = async () => {
      try {
        // 백엔드 리팩토링 후 실제 API로 교체 필요
        const data = await getWaitingCountTest(publicCode);
        if (isMounted) {
          setWaitingInfo({
            waitingCount: data.waitingCount,
            boothName: `${data.storeName} / ${data.departmentName}`,
          });
        }
      } catch (error) {
        console.error("대기 정보 조회 실패:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchWaitingInfo();

    return () => {
      isMounted = false;
    };
  }, [publicCode]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRegister = async () => {
    // 이미 요청 중이면 무시 (더블탭 방지)
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // 멱등성 키와 함께 대기 등록 API 호출 (테스트용)
      const result = await registerWaitingTest(
        publicCode,
        partySize,
        getIdempotencyKey(),
      );
      console.log("대기 등록 성공:", result);

      navigation.navigate("WaitingSuccess", { publicCode });
    } catch (error) {
      console.error("대기 등록 실패:", error);
      // TODO: 에러 처리 (토스트 메시지 등)
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    waitingInfo,
    isLoading,
    isSubmitting,
    handleBack,
    handleRegister,
  };
};
