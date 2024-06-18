import React, { ReactElement, useMemo } from "react";
import { Trans } from "react-i18next";
import { Typography } from "@mui/material";
import cn from "classnames";

import Conversation from "../../models/conversation";
import useQueryDepartmentList from "../../queries/useQueryDepartmentList";

import ConversationCard from "./ConversationCard";
import { sortConversationList } from "./sortConversationList";

interface ConversationCardListProps {
  conversations: Conversation[];
  className?: string;
  portalType: string;
}

const ConversationList = ({
  conversations: conversationList,
  portalType,
  className,
}: ConversationCardListProps): ReactElement => {
  const orderedConversationList: Conversation[] = useMemo(
    () => sortConversationList(conversationList),
    [conversationList]
  );

  const { data: departmentList } = useQueryDepartmentList();

  return (
    <div className={className}>
      <ul className="m-0 flex list-none flex-col gap-9 p-0">
        {orderedConversationList.length > 0 ? (
          orderedConversationList.map((conversation) => {
            const isFromPortal = portalType === conversation.senderType;

            return (
              <li
                key={conversation.orderNumber}
                className={cn(
                  "flex",
                  isFromPortal ? "justify-end" : "justify-start"
                )}
              >
                <ConversationCard
                  departmentList={departmentList ?? []}
                  conversation={conversation}
                  isFromPortal={isFromPortal}
                />
              </li>
            );
          })
        ) : (
          <Typography variant="body2" className="py-6 text-center">
            <Trans i18nKey="ConversationCardList.error.noConversation" />
          </Typography>
        )}
      </ul>
    </div>
  );
};

export default ConversationList;
