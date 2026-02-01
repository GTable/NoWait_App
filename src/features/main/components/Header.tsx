import { Logo } from "@/shared/assets/images";
import { Alert } from "@/shared/assets/images/main/Alert";
import styled from "@emotion/native";
import React from "react";

export const Header = () => {
  return (
    <E.Container>
      <Logo />
      <E.AlertButton>
        <Alert />
      </E.AlertButton>
    </E.Container>
  );
};

const E = {
  Container: styled.View({
    flexDirection: "row",
    height: 56,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "space-between",
    alignItems: "flex-start",
  }),

  AlertButton: styled.TouchableOpacity({
    width: 24,
    height: 24,
  }),
};
