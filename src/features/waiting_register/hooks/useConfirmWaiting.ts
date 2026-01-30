import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/app/config/routes/routes.core";
import { useState, useEffect } from "react";
import { getWaitingInfo, WaitingInfo } from "../model/WaitingApi";
import { registerWaiting } from "../model/WaitingRegisterApi";
import { useIdempotencyKey } from "./useIdempotencyKey";

interface UseConfirmWaitingProps {
  /** 주점 공개 코드 */
  publicCode: string;
  /** 입장 인원 수 */
  personCount: number;
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
  personCount,
}: UseConfirmWaitingProps) => {
  const navigation = useNavigation<ConfirmWaitingNavigationProp>();
  const [waitingInfo, setWaitingInfo] = useState<WaitingInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const getIdempotencyKey = useIdempotencyKey();

  // 화면 진입 시 최신 대기 정보 조회
  useEffect(() => {
    const fetchWaitingInfo = async () => {
      try {
        const data = await getWaitingInfo(publicCode);
        setWaitingInfo(data);
      } catch (error) {
        console.error("대기 정보 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWaitingInfo();
  }, [publicCode]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRegister = async () => {
    try {
      // 멱등성 키와 함께 대기 등록 API 호출
      const result = await registerWaiting(
        publicCode,
        personCount,
        getIdempotencyKey(),
      );
      console.log("대기 등록 성공:", result);

      navigation.navigate("WaitingSuccess", { publicCode });
    } catch (error) {
      console.error("대기 등록 실패:", error);
      // TODO: 에러 처리 (토스트 메시지 등)
    }
  };

  return {
    waitingInfo,
    isLoading,
    handleBack,
    handleRegister,
  };
};
