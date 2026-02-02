import { useRef } from "react";
import * as Crypto from "expo-crypto";

const TEN_MINUTES = 10 * 60 * 1000; // 10분 (밀리초)

/**
 * 멱등성 키 관리 훅
 * - 10분 TTL로 키 재사용
 * - 10분 경과 시 자동으로 새 UUID 생성
 */
export const useIdempotencyKey = () => {
  const idempotencyKeyRef = useRef<string>(Crypto.randomUUID());
  const keyCreatedAtRef = useRef<number>(Date.now());

  const getIdempotencyKey = (): string => {
    const now = Date.now();

    // 10분이 지났으면 새로운 키 생성
    if (now - keyCreatedAtRef.current > TEN_MINUTES) {
      idempotencyKeyRef.current = Crypto.randomUUID();
      keyCreatedAtRef.current = now;
    }

    return idempotencyKeyRef.current;
  };

  return getIdempotencyKey;
};
