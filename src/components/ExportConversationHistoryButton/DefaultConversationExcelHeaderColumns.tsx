import { ConversationExcelHeaders } from "../../models/conversation";
const defaultColumns: ConversationExcelHeaders = {
  orderNumber: {
    i18nKey: "ExportConversationHistoryButton.defaultColumns.orderNumber",
  },
  senderType: {
    i18nKey: "ExportConversationHistoryButton.defaultColumns.senderType",
  },
  receiverType: {
    i18nKey: "ExportConversationHistoryButton.defaultColumns.receiverType",
  },
  senderUserName: {
    i18nKey: "ExportConversationHistoryButton.defaultColumns.senderUserName",
  },
  submissionDateTime: {
    i18nKey:
      "ExportConversationHistoryButton.defaultColumns.submissionDateTime",
    format: "dd/MM/yyyy HH:mm",
  },
  replyDetails: {
    i18nKey: "ExportConversationHistoryButton.defaultColumns.replyDetails",
  },
  reportUserId: {
    i18nKey: "ExportConversationHistoryButton.defaultColumns.reportUserId",
  },
  reportUserName: {
    i18nKey: "ExportConversationHistoryButton.defaultColumns.reportUserName",
  },
  reportUserDepartment: {
    i18nKey:
      "ExportConversationHistoryButton.defaultColumns.reportUserDepartment",
  },
  contactUserName: {
    i18nKey: "ExportConversationHistoryButton.defaultColumns.contactUserName",
  },
  contactDepartment: {
    i18nKey: "ExportConversationHistoryButton.defaultColumns.contactDepartment",
  },
  contactNumber: {
    i18nKey: "ExportConversationHistoryButton.defaultColumns.contactNumber",
  },
  contactEmail: {
    i18nKey: "ExportConversationHistoryButton.defaultColumns.contactEmail",
  },
};

export default defaultColumns;
