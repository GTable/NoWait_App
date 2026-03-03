import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelWaiting } from "../model/CancelWaitingApi";

interface CancelWaitingParams {
  publicCode: string;
  waitingNumber: string;
}

/**
 * 대기 취소 훅
 * - 취소 성공 시 대기 목록 캐시를 무효화한다.
 */
export const useCancelWaiting = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: CancelWaitingParams) => cancelWaiting(params),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["waitingDetails"] }),
        queryClient.invalidateQueries({ queryKey: ["myWaitings"] }),
      ]);
    },
  });

  return {
    cancelWaiting: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
};
