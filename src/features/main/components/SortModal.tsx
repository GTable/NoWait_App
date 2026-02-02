import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { CustomButton } from "@/shared/ui/CustomButton";
import { RadioButton } from "@/shared/ui/CustomRadioButton";
import styled from "@emotion/native";
import React, { useState, useEffect } from "react";
import { Modal } from "react-native";
import { SortOption } from "@/screens/main/MainScreen";

/**
 * 주점 정렬 옵션 선택 모달
 *
 * - 대기 적은 순 / 인기 순 선택
 * - 하단에서 슬라이드 업 애니메이션
 */
interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  currentSort: SortOption;
  onConfirm: (option: SortOption) => void;
}

export const SortModal = ({
  visible,
  onClose,
  currentSort,
  onConfirm,
}: SortModalProps) => {
  const [selectedSort, setSelectedSort] = useState<SortOption>(currentSort);

  useEffect(() => {
    setSelectedSort(currentSort);
  }, [currentSort]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <E.Overlay onPress={onClose}>
        <E.Content onPress={(e) => e.stopPropagation()}>
          <E.Header>
            <E.Title>정렬</E.Title>

            <E.OptionList>
              <E.OptionItem onPress={() => setSelectedSort("asc")}>
                <E.OptionText>대기 적은 순</E.OptionText>
                <RadioButton
                  checked={selectedSort === "asc"}
                  onPress={() => setSelectedSort("asc")}
                />
              </E.OptionItem>

              <E.OptionItem onPress={() => setSelectedSort("desc")}>
                <E.OptionText>인기 순</E.OptionText>
                <RadioButton
                  checked={selectedSort === "desc"}
                  onPress={() => setSelectedSort("desc")}
                />
              </E.OptionItem>
            </E.OptionList>
          </E.Header>

          <E.ButtonContainer>
            <CustomButton
              variant="rounded12"
              onPress={() => onConfirm(selectedSort)}
            >
              확인
            </CustomButton>
          </E.ButtonContainer>
        </E.Content>
      </E.Overlay>
    </Modal>
  );
};

const E = {
  Overlay: styled.Pressable({
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  }),

  Content: styled.Pressable({
    backgroundColor: colors.white[100],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 20,
    gap: 28,
  }),

  Header: styled.View({
    width: "100%",
    paddingLeft: 4,
    gap: 30,
  }),

  Title: styled.Text({
    color: colors.black[90],
    ...typography["title-20-semibold"],
  }),

  OptionList: styled.View({
    gap: 20,
  }),

  OptionItem: styled.TouchableOpacity({
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  }),

  OptionText: styled.Text({
    color: colors.black[90],
    ...typography["title-18-semibold"],
  }),

  ButtonContainer: styled.View({
    width: "100%",
    paddingBottom: 40,
  }),
};
