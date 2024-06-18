import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import Conversation, {
  ConversationExcelHeaders,
  translateConversationUserType,
} from "../models/conversation";
import {
  AccessorType,
  ExportExcelHeader,
  exportExcelWithColumns,
} from "../utils/exportExcel";

export interface ExportConversationExcelButtonProps {
  conversations: Conversation[];
  headers: ConversationExcelHeaders;
}

const useExportConversationExcel = (
  props: ExportConversationExcelButtonProps
): (() => void) => {
  const { conversations, headers } = props;
  const { t } = useTranslation();

  const exportConversationHistory = useCallback(() => {
    if (conversations.length === 0) {
      return;
    }

    const exportData = conversations.map((conversation) => ({
      ...conversation,
      senderType: translateConversationUserType(t, conversation.senderType),
      receiverType: translateConversationUserType(t, conversation.receiverType),
      _index: conversation.orderNumber,
    }));

    const excelHeaders = Object.entries(headers).map<ExportExcelHeader>(
      ([key, header]) => ({
        text: t(header.i18nKey),
        accessor: key as unknown as AccessorType,
        format: header.format,
      })
    );

    exportExcelWithColumns({
      fileName: `conversation_${new Date().toLocaleDateString()}.xlsx`,
      sheetName: "result",
      headers: excelHeaders,
      data: exportData,
    });
  }, [conversations, headers, t]);

  return exportConversationHistory;
};

export default useExportConversationExcel;
