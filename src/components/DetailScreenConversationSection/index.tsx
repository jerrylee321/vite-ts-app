import { PropsWithChildren, ReactElement } from "react";

import Accordion from "../../components/Accordion";
import ConversationList from "../../components/ConversationList";
import ExportConversationHistoryButton from "../../components/ExportConversationHistoryButton";
import Conversation, {
  ConversationExcelHeaders,
} from "../../models/conversation";

import ConversationExcelDefaultHeaders from "./ConversationExcelDefaultHeaders";

export interface ConversationSectionProps extends PropsWithChildren {
  className?: string;
  title: string;
  exportActionTitle?: string;
  conversations: Conversation[];
  exportColumns?: ConversationExcelHeaders;
  portalType: string;
  collapsible?: boolean;
  disableGutters?: boolean;
}

const DetailScreenConversationSection = (
  props: ConversationSectionProps
): ReactElement => {
  const {
    className,
    title,
    conversations,
    exportColumns = ConversationExcelDefaultHeaders,
    exportActionTitle,
    portalType,
    collapsible = true,
    children,
    disableGutters,
  } = props;

  return (
    <Accordion
      className={className}
      title={title}
      collapsible={collapsible}
      disableGutters={disableGutters}
    >
      <ExportConversationHistoryButton
        conversations={conversations}
        excelHeaders={exportColumns}
        title={exportActionTitle}
      />
      <ConversationList
        className="mt-8"
        portalType={portalType}
        conversations={conversations}
      />
      {children}
    </Accordion>
  );
};

export default DetailScreenConversationSection;
