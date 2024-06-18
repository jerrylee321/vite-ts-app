import { ConversationExcelHeaders } from "../../models/conversation";
const ConversationExcelDefaultHeaders: ConversationExcelHeaders = {
  replyTitle: {
    i18nKey: "ConversationExcelDefaultHeaders.excelHeader.replyTitle",
  },
  orderNumber: {
    i18nKey: "ConversationExcelDefaultHeaders.excelHeader.orderNumber",
  },
  senderType: {
    i18nKey: "ConversationExcelDefaultHeaders.excelHeader.senderType",
  },
  receiverType: {
    i18nKey: "ConversationExcelDefaultHeaders.excelHeader.receiverType",
  },
  senderUserName: {
    i18nKey: "ConversationExcelDefaultHeaders.excelHeader.senderUserName",
  },
  submissionDateTime: {
    i18nKey: "ConversationExcelDefaultHeaders.excelHeader.submissionDateTime",
    format: "dd/MM/yyyy HH:mm",
  },
  replyDetails: {
    i18nKey: "ConversationExcelDefaultHeaders.excelHeader.replyDetails",
  },
  reportUserId: {
    i18nKey: "ConversationExcelDefaultHeaders.excelHeader.reportUserId",
  },
  reportUserName: {
    i18nKey: "ConversationExcelDefaultHeaders.excelHeader.reportUserName",
  },
  reportUserDepartment: {
    i18nKey: "ConversationExcelDefaultHeaders.excelHeader.reportUserDepartment",
  },
  contactUserName: {
    i18nKey: "ConversationExcelDefaultHeaders.excelHeader.contactUserName",
  },
  contactDepartment: {
    i18nKey: "ConversationExcelDefaultHeaders.excelHeader.contactDepartment",
  },
  contactNumber: {
    i18nKey: "ConversationExcelDefaultHeaders.excelHeader.contactNumber",
  },
  contactEmail: {
    i18nKey: "ConversationExcelDefaultHeaders.excelHeader.contactEmail",
  },
};

export default ConversationExcelDefaultHeaders;
