import React, { PropsWithChildren, ReactElement } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import HelpIcon from "@mui/icons-material/Help";
import { Typography } from "@mui/material";

import { ReactComponent as SystemAlertIcon } from "../../assets/icons/ic_system_alert.svg";
import { ReactComponent as SystemAlertImportantIcon } from "../../assets/icons/ic_system_alert_important.svg";
import DialogWithActions, {
  DialogWithActionsProps,
} from "../DialogWithActions";

export type DialogIconType =
  | "success"
  | "question"
  | "warning"
  | "fail"
  | "system-alert"
  | "system-alert-important";

interface MessageDialogWithActionsProps
  extends Omit<DialogWithActionsProps, "title">,
    PropsWithChildren {
  title: ReactElement | string;
  body?: ReactElement | string;
  icon: DialogIconType;
}

const MessageDialogWithActions = (
  props: MessageDialogWithActionsProps
): ReactElement => {
  const { icon, body, title, children, ...rest } = props;
  let iconElement = null;

  if (icon === "fail") {
    iconElement = (
      <CancelIcon
        className="text-5xl text-info-main"
        data-testid="DialogFailIcon"
      />
    );
  } else if (icon === "warning") {
    iconElement = (
      <ErrorIcon
        className="text-5xl text-info-main"
        data-testid="DialogWarningIcon"
      />
    );
  } else if (icon === "question") {
    iconElement = (
      <HelpIcon
        className="text-5xl text-info-main"
        data-testid="DialogQuestionIcon"
      />
    );
  } else if (icon === "system-alert-important") {
    iconElement = (
      <SystemAlertImportantIcon
        className="h-12 w-12"
        data-testid="DialogSystemAlertImportantIcon"
      />
    );
  } else if (icon === "system-alert") {
    iconElement = (
      <SystemAlertIcon
        className="h-12 w-12"
        data-testid="DialogSystemAlertIcon"
      />
    );
  } else {
    iconElement = (
      <CheckCircleIcon
        className="text-5xl text-info-main"
        data-testid="DialogSuccessIcon"
      />
    );
  }

  return (
    <DialogWithActions {...rest}>
      <div className="mx-7 flex min-w-80 max-w-100 items-center justify-start">
        <div className="mr-4" data-testid="MessageDialogIcon">
          {iconElement}
        </div>
        {/** Add min width to make content in flex wrappable
         * https://stackoverflow.com/questions/36230944/prevent-flex-items-from-overflowing-a-container
         */}
        <div className="flex min-w-0 flex-col">
          <div data-testid="MessageDialogTitle">
            {typeof title === "string" ? (
              <Typography className="whitespace-pre-line break-words font-bold">
                {title}
              </Typography>
            ) : (
              title
            )}
          </div>
          <div className="mt-1" data-testid="MessageDialogBody">
            {typeof body === "string" ? (
              <Typography className="whitespace-pre-wrap text-sm">
                {body}
              </Typography>
            ) : (
              body
            )}
          </div>
        </div>
      </div>
      <div className="min-w-80 max-w-100 px-7">{children}</div>
    </DialogWithActions>
  );
};

export default MessageDialogWithActions;
