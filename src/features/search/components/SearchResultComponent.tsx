import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { StoreComponent } from "@/shared/ui/StoreComponent";
import styled from "@emotion/native";

interface SearchResultComponentProps {
  /** 검색 결과 주점 목록 */
  stores: {
    publicCode: string;
    name: string;
    departmentName: string;
    storeLogoUrl?: string;
    isActive: boolean;
    waitingCount: number;
  }[];
  /** 검색 완료 여부 (빈 결과 메시지 표시용) */
  hasSearched?: boolean;
  /** 주점 클릭 시 호출되는 콜백 (최근 검색어 저장용) */
  onStorePress?: (publicCode: string, name: string) => void;
}

/**
 * 검색 결과 표시 컴포넌트
 * - 검색된 주점 목록을 카드 형태로 표시
 * - 검색 결과가 없을 때 "검색결과가 없습니다" 메시지 표시
 */
export const SearchResultComponent = ({
  stores,
  hasSearched = true,
  onStorePress,
}: SearchResultComponentProps) => {
  const showEmptyMessage = hasSearched && stores.length === 0;

  return (
    <E.Container style={{ gap: showEmptyMessage ? 40 : 16 }}>
      <E.SectionTitle>검색 결과</E.SectionTitle>
      {showEmptyMessage ? (
        <E.EmptyMessage>검색결과가 없습니다.</E.EmptyMessage>
      ) : (
        stores.map((store) => (
          <StoreComponent
            key={store.publicCode}
            publicCode={store.publicCode}
            name={store.name}
            departmentName={store.departmentName}
            storeLogoUrl={store.storeLogoUrl}
            isActive={store.isActive}
            waitingCount={store.waitingCount}
            onPress={() => onStorePress?.(store.publicCode, store.name)}
          />
        ))
      )}
    </E.Container>
  );
};

const E = {
  Container: styled.View({
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 16,
  }),

  SectionTitle: styled.Text({
    fontFamily: "Pretendard",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 16 * 1.44,
    letterSpacing: -0.16,
    color: colors.black[90],
    paddingHorizontal: 20,
  }),

  EmptyMessage: styled.Text({
    width: "100%",
    textAlign: "center",
    ...typography["text-16-regular"],
    color: colors.black[50],
  }),
};
