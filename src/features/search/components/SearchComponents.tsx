import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { SearchSvg } from "@/shared/assets/images";
import styled from "@emotion/native";
import React from "react";
import { View } from "react-native";

/**
 * 검색 입력 컴포넌트
 * - 검색어 입력 필드 (주점명, 메뉴, 학과 검색)
 * - 닫기 버튼으로 검색 화면 종료
 */
interface SearchComponentsProps {
  /** 검색어 */
  searchText: string;
  /** 검색어 변경 콜백 */
  onSearchTextChange: (text: string) => void;
  /** 닫기 버튼 클릭 콜백 */
  onClose?: () => void;
}

export const SearchComponents = ({
  searchText,
  onSearchTextChange,
  onClose,
}: SearchComponentsProps) => {
  return (
    <E.SearchSection>
      <E.SearchContainer>
        <E.SearchBox>
          <View pointerEvents="none">
            <SearchSvg width={20} height={20} />
          </View>
          <E.SearchInput
            placeholder="주점명, 메뉴, 학과 검색"
            placeholderTextColor={colors.black[50]}
            value={searchText}
            onChangeText={onSearchTextChange}
          />
        </E.SearchBox>

        <E.CloseButton onPress={onClose}>
          <E.CloseText>닫기</E.CloseText>
        </E.CloseButton>
      </E.SearchContainer>
    </E.SearchSection>
  );
};

const E = {
  SearchSection: styled.View({
    width: "100%",
    height: 56,
    paddingHorizontal: 20,
    paddingTop: 3,
    paddingBottom: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  }),

  SearchContainer: styled.View({
    width: "100%",
    alignItems: "center",
    gap: 16,
    flexDirection: "row",
  }),

  SearchBox: styled.View({
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 16,
    gap: 8,
    backgroundColor: colors.black[15],
    flex: 1,
    flexDirection: "row",
  }),

  SearchInput: styled.TextInput({
    flex: 1,
    ...typography["text-16-regular"],
    color: colors.black[90],
  }),

  CloseButton: styled.TouchableOpacity({}),

  CloseText: styled.Text({
    ...typography["title-16-semibold"],
    color: colors.black[60],
  }),
};
