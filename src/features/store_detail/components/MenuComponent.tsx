import { colors } from "@/app/styles/colors";
import { typography } from "@/app/styles/typography";
import styled from "@emotion/native";
import { MenuCard } from "./MenuCard";

interface MenuItem {
  id: string;
  name: string;
  price: string;
  imageUrl?: string;
}

interface MenuComponentProps {
  menus?: MenuItem[];
}

// 임시 데이터
const MOCK_MENUS: MenuItem[] = [
  { id: "1", name: "메뉴명이 길어질 땐 이렇게 해주시면 됩니다 최대 2줄까지", price: "12,000원" },
  { id: "2", name: "츄러스", price: "5,000원" },
  { id: "3", name: "아이스티", price: "3,000원" },
];

export const MenuComponent = ({ menus = MOCK_MENUS }: MenuComponentProps) => {
  return (
    <E.Layout>
      <E.TitleText>메뉴</E.TitleText>

      {/* 메뉴 리스트 */}
      <E.MenuWrapper>
        {menus.map((menu) => (
          <MenuCard
            key={menu.id}
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
