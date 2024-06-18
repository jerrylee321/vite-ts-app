import { ReactElement, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import ForwardIcon from "@mui/icons-material/Forward";
import { Divider, Typography } from "@mui/material";
import cn from "classnames";
import { formatInTimeZone } from "date-fns-tz";

import useLookupCommonOptionValue from "../../hooks/useLookupCommonOptionValue";
import useTimeZone from "../../hooks/useTimeZone";
import { MessageKey } from "../../i18n/LocaleModel";
import Conversation, {
  translateConversationUserType,
} from "../../models/conversation";
import { CommonOption } from "../../models/option";
import { MuiDividerOverride } from "../../styles/MuiDividerOverride.module.scss";

interface ConversationCardProps {
  conversation: Conversation;
  className?: string;
  isFromPortal: boolean;
  departmentList: CommonOption[];
}

interface Detail {
  id?: string;
  title?: string;
  value: string | null;
  "data-testid"?: string;
}

interface DetailRowProps {
  details: Detail[];
}
const DetailsRow = ({ details }: DetailRowProps) => {
  return (
    <div className="flex grow flex-wrap">
      {details.map((detail, index) => {
        const { "data-testid": dataTestId, id, title, value } = detail;

        const displayValue = value ?? "-";
        const key = id ?? dataTestId ?? `${index}`;

        return (
          <Typography
            className="after:mx-2 after:content-['|'] last:after:content-none "
            variant="body2"
            data-testid={dataTestId}
            key={key}
          >
            {title ? (
              <Trans<MessageKey>
                i18nKey="ConversationCard.titleValuePair"
                values={{
                  title: title,
                  value: displayValue,
                }}
                components={[<span key="0" className="font-bold" />]}
              />
            ) : (
              displayValue
            )}
          </Typography>
        );
      })}
    </div>
  );
};

const ConversationCard = ({
  conversation,
  className,
  isFromPortal,
  departmentList,
}: ConversationCardProps): ReactElement => {
  const { t } = useTranslation();
  const timeZone = useTimeZone();
  const orderNumber = useMemo(
    () => conversation.orderNumber?.toString().padStart(2, "0"),
    [conversation.orderNumber]
  );

  const submissionDateTime = useMemo(() => {
    return conversation.submissionDateTime
      ? formatInTimeZone(
          conversation.submissionDateTime,
          timeZone,
          "dd/MM/yyyy HH:mm"
        )
      : null;
  }, [conversation.submissionDateTime, timeZone]);

  const receiverText = useMemo(() => {
    return translateConversationUserType(t, conversation.receiverType);
  }, [conversation.receiverType, t]);

  const senderText = useMemo(() => {
    return translateConversationUserType(t, conversation.senderType);
  }, [conversation.senderType, t]);

  const lookupDepartment = useLookupCommonOptionValue(departmentList);

  return (
    <div
      className={cn(className, "max-w-9/12 flex-col text-independence-main")}
      data-testid="ConversationCardRoot"
    >
      <div className="flex flex-row flex-wrap items-center gap-x-10">
        <DetailsRow
          details={[
            {
              value: t("ConversationCard.index", { index: orderNumber ?? "-" }),
              "data-testid": "ConversationCardOrder",
            },
            {
              value: senderText,
              "data-testid": "ConversationCardSenderType",
            },
            {
              title: t("ConversationCard.sender.title"),
              value: conversation.senderUserName,
              "data-testid": "ConversationCardSenderUserName",
            },
            {
              title: t("ConversationCard.submissionDateTime.title"),
              value: submissionDateTime,
              "data-testid": "ConversationCardSubmissionDateTime",
            },
          ]}
        />
        <div className="ml-auto flex items-center gap-1	text-gray-dark">
          <Typography variant="h6" data-testid="ConversationCardParty1">
            {isFromPortal ? receiverText : senderText}
          </Typography>
          {isFromPortal ? (
            <ForwardIcon className="rotate-180" data-testid="ArrowBackIcon" />
          ) : (
            <ForwardIcon data-testid="ArrowForwardIcon" />
          )}
          <Typography variant="h6" data-testid="ConversationCardParty2">
            {isFromPortal ? senderText : receiverText}
          </Typography>
        </div>
      </div>
      <div
        className={cn("flex-col flex-wrap rounded-t-3xl p-8 shadow-md", {
          "bg-gray-light rounded-bl-3xl": isFromPortal,
          "bg-cyanBlue-light rounded-br-3xl": !isFromPortal,
        })}
        data-testid="ConversationCardBubbleContainer"
      >
        <div className="flex flex-col gap-2 pb-8">
          <Typography
            variant="h5"
            className="text-sm font-bold text-secondary-main"
          >
            {conversation.replyTitle ?? (
              <Trans i18nKey="ConversationCard.repliedByEMPF.title" />
            )}
          </Typography>
          <Typography
            variant="body1"
            className="whitespace-pre-wrap font-bold leading-6"
            data-testid="ConversationCardReplyDetails"
          >
            {conversation.replyDetails}
          </Typography>
        </div>
        <Divider className={cn(MuiDividerOverride, "my-4")} />
        <div className="flex flex-col flex-wrap items-start">
          <DetailsRow
            details={[
              {
                title: t("ConversationCard.reportUserId.title"),
                value: conversation.reportUserId,
                "data-testid": "ConversationCarReportUserId",
              },
              {
                title: t("ConversationCard.reportUserName.title"),
                value: conversation.reportUserName,
                "data-testid": "ConversationCardReportUserName",
              },
              {
                title: t("ConversationCard.reportUserDepartment.title"),
                value: lookupDepartment(conversation.reportUserDepartment),
                "data-testid": "ConversationCardReportUserDepartment",
              },
            ]}
          />
          <DetailsRow
            details={[
              {
                title: t("ConversationCard.contactUserName.title"),
                value: conversation.contactUserName,
                "data-testid": "ConversationCardContactUserName",
              },
              {
                title: t("ConversationCard.contactDepartment.title"),
                value: lookupDepartment(conversation.contactDepartment),
                "data-testid": "ConversationCardContactDepartment",
              },
              {
                title: t("ConversationCard.contactNumber.title"),
                value: conversation.contactNumber,
                "data-testid": "ConversationCardContactNumber",
              },
            ]}
          />
          <DetailsRow
            details={[
              {
                title: t("ConversationCard.contactEmail.title"),
                value: conversation.contactEmail,
                "data-testid": "ConversationCardContactEmail",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
