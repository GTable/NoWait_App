import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import styled from "@emotion/native";
import { MenuCard } from "./MenuCard";

interface MenuComponentProps {
  menus: {
    menuId: number;
    name: string;
    price: number;
    imageUrl?: string;
  }[];
}

export const MenuComponent = ({ menus }: MenuComponentProps) => {
  return (
    <E.Layout>
      <E.TitleText>메뉴</E.TitleText>

      {/* 메뉴 리스트 */}
      <E.MenuWrapper>
        {menus.map((menu) => (
          <MenuCard
            key={menu.menuId}
            name={menu.name}
            price={menu.price}
            imageUrl={menu.imageUrl}
          />
        ))}
      </E.MenuWrapper>
    </E.Layout>
  );
};

const E = {
  Layout: styled.View({
    flex: 1,
    backgroundColor: colors.white[100],
    flexDirection: "column",
    paddingTop: 29,
    gap: 19,
  }),
  TitleText: styled.Text({
    paddingHorizontal: 20,
    overflow: "hidden",
    color: colors.black[90],
    ...typography["title-20-semibold"],
  }),
  MenuWrapper: styled.View({
    flexDirection: "column",
    gap: 20,
    alignItems: "flex-start",
    width: "100%",
  }),
};
