import { MessageKey } from "../i18n/LocaleModel";
import Conversation, { ConversationExcelHeaders } from "../models/conversation";
import { exportExcelWithColumns } from "../utils/exportExcel";
import { renderHookWithProviders } from "../utils/test/render";

import useExportConversationExcel from "./useExportConversationExcel";

jest.mock("../utils/exportExcel", () => ({
  exportExcelWithColumns: jest.fn(),
}));

enum MockConversationUserType {
  MPFA = "MPFA",
  EMPF = "eMPF",
}

const mockConversations: Conversation[] = [
  {
    orderNumber: "2",
    senderType: MockConversationUserType.MPFA,
    receiverType: MockConversationUserType.EMPF,
    senderUserName: "Sender 2",
    submissionDateTime: new Date("2023-02-19T20:40:14+0800"),
    replyDetails:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    reportUserId: "2887745",
    reportUserName: "Emily Leung",
    reportUserDepartment: "Department Name",
    contactUserName: "Emily Leung",
    contactDepartment: "Contact Department Name",
    contactNumber: "33223321",
    contactEmail: "kiki@company.com",
  },
  {
    orderNumber: "3",
    senderType: MockConversationUserType.MPFA,
    receiverType: MockConversationUserType.EMPF,
    senderUserName: "Sender 3",
    submissionDateTime: new Date("2023-02-19T20:40:14+0800"),
    replyDetails:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    reportUserId: "1234",
    reportUserName: "Emily Leung",
    reportUserDepartment: "Department Name",
    contactUserName: "Emily Leung",
    contactDepartment: "Contact Department Name",
    contactNumber: "33223321",
    contactEmail: "kiki@company.com",
  },
  {
    orderNumber: "1",
    senderType: MockConversationUserType.EMPF,
    receiverType: MockConversationUserType.MPFA,
    senderUserName: "Emily Leung",
    submissionDateTime: new Date("2023-02-19T20:40:14+0800"),
    replyDetails:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    reportUserId: "2887745",
    reportUserName: "Emily Leung",
    reportUserDepartment: "Department Name",
    contactUserName: "Emily Leung",
    contactDepartment: "Contact Department Name",
    contactNumber: "33223321",
    contactEmail: "kiki@company.com",
  },
];

const mockExcelHeaders: ConversationExcelHeaders = {
  orderNumber: {
    i18nKey: "mock" as MessageKey,
  },
  senderType: {
    i18nKey: "mock" as MessageKey,
  },
  receiverType: {
    i18nKey: "mock" as MessageKey,
  },
  senderUserName: {
    i18nKey: "mock" as MessageKey,
  },
  submissionDateTime: {
    i18nKey: "mock" as MessageKey,
  },
  replyDetails: {
    i18nKey: "mock" as MessageKey,
  },
  reportUserId: {
    i18nKey: "mock" as MessageKey,
  },
  reportUserName: {
    i18nKey: "mock" as MessageKey,
  },
  reportUserDepartment: {
    i18nKey: "mock" as MessageKey,
  },
  contactUserName: {
    i18nKey: "mock" as MessageKey,
  },
  contactDepartment: {
    i18nKey: "mock" as MessageKey,
  },
  contactNumber: {
    i18nKey: "mock" as MessageKey,
  },
  contactEmail: {
    i18nKey: "mock" as MessageKey,
  },
};

describe("useExportConversationExcel", () => {
  const mockExport = exportExcelWithColumns as jest.Mock;
  it("should export with conversation", () => {
    const exportFunc = renderHookWithProviders(() =>
      useExportConversationExcel({
        conversations: mockConversations,
        headers: mockExcelHeaders,
      })
    );

    exportFunc.result.current();
    expect(mockExport).toBeCalled();
  });

  it("should not export without conversation", () => {
    const exportFunc = renderHookWithProviders(() =>
      useExportConversationExcel({
        conversations: [],
        headers: mockExcelHeaders,
      })
    );

    exportFunc.result.current();
    expect(mockExport).not.toBeCalled();
  });

  afterEach(() => {
    mockExport.mockClear();
  });
});
