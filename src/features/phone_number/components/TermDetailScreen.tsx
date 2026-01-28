import { colors } from "@/app/styles/colors";
import { BackHeader } from "@/shared/ui/BackHeader";
import styled from "@emotion/native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

// 약관 타입 정의
export type TermType = "service" | "privacy" | "marketing";

// 섹션 콘텐츠 타입
interface TermSection {
  title?: string;
  content?: string;
  listItems?: { marker: string; text: string }[];
}

// 약관 데이터 타입
interface TermData {
  headerTitle: string;
  sections: TermSection[];
}

// 약관 데이터 정의
const TERM_DATA: Record<TermType, TermData> = {
  service: {
    headerTitle: "서비스 이용약관",
    sections: [
      {
        title: "[필수] 노웨잇 서비스 이용약관 동의\n제1조 (목적)",
        content:
          '본 약관은 노웨잇(이하 "회사")이 제공하는 서비스의 이용 조건 및 절차, 회사와 회원 간의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.',
      },
      {
        title: "제 2조 (회원가입 및 계정 관리)",
        listItems: [
          {
            marker: "1.",
            text: "회원은 회사가 정한 절차에 따라 소셜 로그인 또는 별도의 가입 절차를 통해 계정을 생성합니다.",
          },
          {
            marker: "2.",
            text: "회원은 계정 및 비밀번호 관리 책임이 있으며, 이를 제3자에게 양도, 대여, 공유할 수 없습니다.",
          },
        ],
      },
      {
        title: "제 3조 (서비스 이용)",
        listItems: [
          {
            marker: "1.",
            text: "회사는 회원에게 예약, 알림, 대기 관리 등의 서비스를 제공합니다.",
          },
          {
            marker: "2.",
            text: "회원은 관련 법령을 준수해야 하며, 타인의 정보를 도용하거나 허위 정보를 제공해서는 안 됩니다.",
          },
        ],
      },
      {
        title: "제 4조 (서비스의 변경 및 중단)",
        content:
          "회사는 서비스의 일부 또는 전부를 변경·중단할 수 있으며, 이 경우 사전에 회원에게 고지합니다.",
      },
      {
        title: "제 5조 (이용 제한 및 계약 해지)",
        content:
          "회사는 서비스의 일부 또는 전부를 변경·중단할 수 있으며, 이 경우 사전에 회원에게 고지합니다.",
      },
      {
        title: "제 6조 (면책 조항)",
        content:
          "회사는 천재지변, 네트워크 장애, 불가항력적 사유로 인한 서비스 중단에 대하여 책임을 지지 않습니다.",
      },
    ],
  },
  privacy: {
    headerTitle: "개인정보 수집 및 이용 동의",
    sections: [
      {
        title: "[필수] 개인정보 수집 및 이용 동의",
        content:
          "회사는 「개인정보 보호법」에 따라 회원님의 개인정보를 수집·이용하고 있습니다. \n서비스 이용을 위해 아래 내용을 확인하시고 동의해 주시기 바랍니다.",
      },
      {
        title: "수집 항목",
        listItems: [
          {
            marker: "•",
            text: "이메일(소셜 로그인 연동), 비밀번호, 휴대전화 번호",
          },
        ],
      },
      {
        title: "수집 및 이용목적",
        listItems: [
          { marker: "•", text: "회원 식별 및 계정 관리" },
          { marker: "•", text: "본인 확인, 계정 복구, 서비스 알림 발송" },
        ],
      },
      {
        title: "보유 및 이용기간",
        listItems: [{ marker: "•", text: "회원 탈퇴 시까지" }],
      },
      {
        content:
          "※ 법령에 따라 보관이 필요한 경우, 관련 법령에서 정한 기간 동안 보관합니다.\n※ 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보, 단말기정보(서비스 버전, OS, OS 버전, 디바이스 모델명) 등 자동으로 수집될 수 있습니다.\n※ 필수항목에 대한 수집 및 이용에 동의하지 않을 권리는 있으나, 미동의 시 회원가입이 불가합니다.",
      },
    ],
  },
  marketing: {
    headerTitle: "개인정보 마케팅 활용 동의",
    sections: [
      {
        title: "[선택] 마케팅 정보 수신 동의",
        content:
          "회사는 회원에게 이벤트, 할인 혜택, 신규 서비스 안내 등 유용한 정보를 제공하기 위하여 휴대전화 번호 또는 이메일을 통해 광고성 정보를 발송할 수 있습니다.",
        listItems: [
          {
            marker: "1.",
            text: "수신 항목: 휴대전화(SMS, 카카오 알림톡 등), 이메일",
          },
          { marker: "2.", text: "수신 목적: 이벤트, 프로모션, 서비스 안내" },
          {
            marker: "3.",
            text: "보유 및 이용 기간: 동의 철회 시 또는 회원 탈퇴 시까지",
          },
        ],
      },
      {
        content:
          "※ 동의를 거부하셔도 서비스 이용에는 제한이 없습니다.\n※ 법령에 따라 보관이 필요한 경우, 관련 법령에서 정한 기간 동안 보관합니다.",
      },
    ],
  },
};

interface TermDetailScreenProps {
  type: TermType;
  onClose?: () => void;
}

const noop = () => {};

const TermDetailScreen = ({ type, onClose }: TermDetailScreenProps) => {
  const { headerTitle, sections } = TERM_DATA[type];

  return (
    <E.ModalContainer>
      <BackHeader title={headerTitle} onPress={onClose || noop} />
      <E.Container>
        {sections.map((section, index) => (
          <E.Section key={index}>
            {section.title && <E.Title>{section.title}</E.Title>}
            {section.content && <E.Content>{section.content}</E.Content>}
            {section.listItems?.map((item, itemIndex) => (
              <E.ListItem key={itemIndex}>
                <E.ListNumber>{item.marker}</E.ListNumber>
                <E.ListContent>{item.text}</E.ListContent>
              </E.ListItem>
            ))}
          </E.Section>
        ))}
      </E.Container>
    </E.ModalContainer>
  );
};

export default TermDetailScreen;

// 공통 텍스트 스타일
const baseTextStyle = {
  color: colors.black[70],
  fontFamily: "Pretendard",
  fontSize: 13,
  fontStyle: "normal" as const,
  fontWeight: "400" as const,
  lineHeight: 20.8,
  fontVariant: ["tabular-nums" as const],
};

const E = {
  ModalContainer: styled(SafeAreaView)({
    flex: 1,
    backgroundColor: colors.white[100],
  }),

  Container: styled.View({
    flex: 1,
    width: "100%",
    flexDirection: "column",
    backgroundColor: colors.white[100],
    alignItems: "flex-start",
    gap: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
  }),

  Section: styled.View({
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
  }),

  Title: styled.Text({
    ...baseTextStyle,
    alignSelf: "stretch",
    fontWeight: "600",
  }),

  Content: styled.Text({
    ...baseTextStyle,
    alignSelf: "stretch",
  }),

  ListItem: styled.View({
    flexDirection: "row",
    alignSelf: "stretch",
    paddingLeft: 4,
    gap: 2,
  }),

  ListNumber: styled.Text({
    ...baseTextStyle,
  }),

  ListContent: styled.Text({
    ...baseTextStyle,
    flex: 1,
  }),
};
