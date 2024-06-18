import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";

import useExportConversationExcel from "../../hooks/useExportConversationExcel";
import Conversation, {
  ConversationExcelHeaders,
} from "../../models/conversation";

import DefaultConversationExcelHeaderColumns from "./DefaultConversationExcelHeaderColumns";

interface ExportConversationHistoryButtonProps {
  conversations: Conversation[];
  excelHeaders?: ConversationExcelHeaders;
  title?: string;
}

const ExportConversationHistoryButton = (
  props: ExportConversationHistoryButtonProps
): ReactElement => {
  const { t } = useTranslation();
  const {
    conversations,
    excelHeaders = DefaultConversationExcelHeaderColumns,
    title = t("ExportConversationHistoryButton.title"),
  } = props;

  const exportExcel = useExportConversationExcel({
    conversations: conversations,
    headers: excelHeaders,
  });

  return (
    <div className="flex grow items-center">
      <Button
        variant="outlined"
        className="rounded-full border-2 border-info-main text-info-main"
        onClick={exportExcel}
        data-testid="ExportHistroyButton"
      >
        {title}
      </Button>
    </div>
  );
};

export default ExportConversationHistoryButton;
