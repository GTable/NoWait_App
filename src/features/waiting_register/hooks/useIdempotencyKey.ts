import { useRef } from "react";

const TEN_MINUTES = 10 * 60 * 1000; // 10분 (밀리초)

/**
 * 멱등성 키 관리 hook
 * - 10분 TTL로 키를 관리
 * - 10분이 지나면 자동으로 새 키 생성
 */
export const useIdempotencyKey = () => {
  const idempotencyKeyRef = useRef<string>(crypto.randomUUID());
  const keyCreatedAtRef = useRef<number>(Date.now());

  const getIdempotencyKey = (): string => {
    const now = Date.now();

    // 10분이 지났으면 새로운 키 생성
    if (now - keyCreatedAtRef.current > TEN_MINUTES) {
      idempotencyKeyRef.current = crypto.randomUUID();
      keyCreatedAtRef.current = now;
    }

    return idempotencyKeyRef.current;
  };

  return getIdempotencyKey;
};
