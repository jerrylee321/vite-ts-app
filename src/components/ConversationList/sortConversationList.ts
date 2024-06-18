import Conversation from "../../models/conversation";

export const sortConversationList: (
  conversations: Conversation[]
) => Conversation[] = (conversations) => {
  return conversations.sort(
    (a, b) => Number(a.orderNumber) - Number(b.orderNumber)
  );
};
