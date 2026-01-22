import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import { formatPrice } from "@/shared/utils/formatPrice";
import styled from "@emotion/native";

interface MenuCardProps {
  name: string;
  price: number;
  imageUrl?: string;
  onPress?: () => void;
}

export const MenuCard = ({ name, price, imageUrl, onPress }: MenuCardProps) => {
  return (
    <E.Container onPress={onPress}>
      {/* 메뉴명, 금액 영역 */}
      <E.InfoBox>
        <E.MenuName numberOfLines={2} ellipsizeMode="tail">
          {name}
        </E.MenuName>
        <E.MenuPrice>{formatPrice(price)}</E.MenuPrice>
      </E.InfoBox>

      {/* 메뉴 이미지 */}
      {imageUrl ? (
        <E.MenuImage source={{ uri: imageUrl }} />
      ) : (
        <E.ImagePlaceholder />
      )}
    </E.Container>
  );
};

const E = {
  Container: styled.TouchableOpacity({
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  }),
  InfoBox: styled.View({
    width: 224,
    height: 90,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 4,
  }),
  MenuName: styled.Text({
    color: colors.black[90],
    ...typography["title-16-semibold"],
  }),
  MenuPrice: styled.Text({
    color: colors.black[80],
    ...typography["text-16-medium"],
  }),
  MenuImage: styled.Image({
    width: 80,
    height: 80,
    borderRadius: 8,
  }),
  ImagePlaceholder: styled.View({
    width: 80,
    height: 80,
    backgroundColor: "#F2F6F9",
    borderRadius: 8,
  }),
};
