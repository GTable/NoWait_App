import { createRoute } from "@/app/config/routes/routes.core";
import { z } from "zod";

/**
 * 대기 등록 플로우 라우트 정의
 */

export const EnterPersonRoute = createRoute("EnterPerson", {
  path: "enter-person",
  params: z.object({
    publicCode: z.string(),
  }),
});

export const ConfirmWaitingRoute = createRoute("ConfirmWaiting", {
  path: "confirm-waiting",
  params: z.object({
    publicCode: z.string(),
    personCount: z.number(),
  }),
});

export const WaitingSuccessRoute = createRoute("WaitingSuccess", {
  path: "waiting-success",
  params: z.object({
    publicCode: z.string(),
  }),
});
