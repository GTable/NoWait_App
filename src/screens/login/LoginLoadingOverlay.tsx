import styled from "@emotion/native";
import { Logo } from "@/shared/assets/images";
import { CustomSpinner } from "@/shared/ui/CustomSpinner";
import { colors } from "@/app/styles/colors";

export const LoginLoadingOverlay = () => {
  return (
    <E.LoadingOverlay>
      <E.Container>
        <Logo />
        <CustomSpinner />
      </E.Container>
    </E.LoadingOverlay>
  );
};

const E = {
  LoadingOverlay: styled.View({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white[100],
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10000,
  }),

  Container: styled.View({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  }),
};
