export interface WaitingCardData {
  reservationId: number;
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

/** 대기 상세 화면 목업 데이터 */
export const MOCK_WAITING_DETAILS: WaitingDetailItem[] = [
  {
    teamsAhead: 5,
    card: {
      reservationId: 18,
      storeName: "스페이시스",
      departmentName: "컴퓨터공학과",
      partySize: 4,
      registeredAt: "2025.06.12 18:56",
      location: "가천대학교 무한광장",
      profileImageUrl:
        "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=256&q=80",
    },
  },
  {
    teamsAhead: 12,
    card: {
      reservationId: 21,
      storeName: "캠퍼스하우스",
      departmentName: "전자공학과",
      partySize: 2,
      registeredAt: "2025.06.12 19:14",
      location: "가천대학교 비전타워 앞",
      profileImageUrl:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=256&q=80",
    },
  },
  {
    teamsAhead: 3,
    card: {
      reservationId: 24,
      storeName: "노웨잇펍",
      departmentName: "경영학과",
      partySize: 6,
      registeredAt: "2025.06.12 20:03",
      location: "가천대학교 중앙도서관 옆",
      profileImageUrl:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=256&q=80",
    },
  },
];
