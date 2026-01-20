import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { StoreComponent } from "@/shared/ui/StoreComponent";
import styled from "@emotion/native";

interface Store {
  id: string;
  name: string;
  departmentName: string;
  storeLogoUrl?: string;
  isActive: boolean;
  waitingCount: number;
}

interface SearchResultComponentProps {
  /** 검색 결과 주점 목록 */
  stores: Store[];
  /** 주점 카드 클릭 시 실행될 콜백 함수 */
  onStorePress?: (storeId: string, storeName: string) => void;
  /** 검색 완료 여부 (빈 결과 메시지 표시용) */
  hasSearched?: boolean;
}

/**
 * 검색 결과를 표시하는 컴포넌트
 * - 검색된 주점 목록을 카드 형태로 표시
 */
export const SearchResultComponent = ({
  stores,
  onStorePress,
  hasSearched = true,
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
            key={store.id}
            name={store.name}
            departmentName={store.departmentName}
            storeLogoUrl={store.storeLogoUrl}
            isActive={store.isActive}
            waitingCount={store.waitingCount}
            onPress={() => onStorePress?.(store.id, store.name)}
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
