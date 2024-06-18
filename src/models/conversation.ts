import { MessageKey } from "../i18n/LocaleModel";

export type ConversationExcelHeaders = {
  [K in keyof Conversation]: {
    i18nKey: MessageKey;
    format?: string;
  };
};

export function normalizeAPIConversationUserType(
  apiConversationUserType: string | null
): string | null {
  return apiConversationUserType?.toLowerCase() ?? null;
}

export enum ConversationUserType {
  MPFA = "mpfa",
  EMPF = "empf",
  TRUSTEE = "trustee",
  ADM = "adm",
}

export function isValidConversationUserType(
  apiUserType: string
): apiUserType is ConversationUserType {
  return (
    Object.values(ConversationUserType).find((s) => s === apiUserType) != null
  );
}

export function translateConversationUserType(
  t: (str: MessageKey) => string,
  conversationUserType:
    | Conversation["senderType"]
    | Conversation["receiverType"]
): string | null {
  if (
    conversationUserType &&
    isValidConversationUserType(conversationUserType)
  ) {
    return t(`ConversationCard.conversationUserType.${conversationUserType}`);
  }
  return conversationUserType;
}

interface Conversation {
  replyTitle?: string | null;
  orderNumber: string | null;
  senderType: string | null;
  receiverType: string | null;
  senderUserName: string | null;
  submissionDateTime: Date | null;
  replyDetails: string | null;
  reportUserId: string | null;
  reportUserName: string | null;
  reportUserDepartment: string | null;
  contactUserName: string | null;
  contactDepartment: string | null;
  contactNumber: string | null;
  contactEmail: string | null;
}

export default Conversation;
