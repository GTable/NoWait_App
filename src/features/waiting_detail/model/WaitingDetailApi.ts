import { z } from "zod";
import { usersApiTest } from "@/shared/api/usersApiTest";
import { formatDateTime } from "@/shared/utils/formatDateTime";
import { formatWaitingNumber } from "@/shared/utils/formatWaitingNumber";

const WaitingDetailItemSchema = z.object({
  reservationId: z.union([z.string(), z.number()]),
  publicCode: z.string(),
  storeName: z.string(),
  departmentName: z.string(),
  teamsAhead: z.number(),
  partySize: z.number(),
  registeredAt: z.string(),
  location: z.string(),
  profileImageUrl: z.string(),
});

const WaitingDetailResponseSchema = z.object({
  success: z.boolean(),
  response: z.array(WaitingDetailItemSchema),
});

export interface WaitingCardData {
  waitingNumber: string;
  publicCode: string;
  storeName: string;
  departmentName: string;
  partySize: number;
  registeredAt: string;
  location: string;
  profileImageUrl: string;
}

export interface WaitingDetailItem {
  teamsAhead: number;
  card: WaitingCardData;
}

/**
 * 나의 대기 상세 목록 조회 API
 * - 최대 3개의 대기 정보만 반환한다.
 */
export const getWaitingDetails = async (): Promise<WaitingDetailItem[]> => {
  try {
    const rawResponse = await usersApiTest.get("/waitings");
    const response = WaitingDetailResponseSchema.parse(rawResponse);

    return response.response.slice(0, 3).map((item) => ({
      teamsAhead: item.teamsAhead,
      card: {
        waitingNumber: formatWaitingNumber(item.reservationId),
        publicCode: item.publicCode,
        storeName: item.storeName,
        departmentName: item.departmentName,
        partySize: item.partySize,
        registeredAt: formatDateTime(item.registeredAt),
        location: item.location,
        profileImageUrl: item.profileImageUrl,
      },
    }));
  } catch {
    return [];
  }
};
