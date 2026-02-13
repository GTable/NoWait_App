/**
 * WaitingDetail 화면에서 카드 렌더링에 사용하는 라우트 데이터 단위
 */
export interface WaitingDetailRouteCard {
  waitingNumber: string;
  publicCode: string;
  storeName: string;
  departmentName: string;
  partySize: number;
  registeredAt: string;
  location: string;
  profileImageUrl: string;
}

/**
 * WaitingDetail 화면의 개별 대기 아이템
 */
export interface WaitingDetailRouteItem {
  teamsAhead: number;
  card: WaitingDetailRouteCard;
}

/**
 * WaitingDetail 라우트 파라미터
 */
export interface WaitingDetailRouteParams {
  waitings: WaitingDetailRouteItem[];
  selectedWaitingNumber: string;
}
