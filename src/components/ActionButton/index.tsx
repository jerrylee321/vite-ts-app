import { ReactElement } from "react";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, ButtonProps } from "@mui/material";
import cn from "classnames";

import { MessageKey } from "../../i18n/LocaleModel";

interface ActionButtonProps extends ButtonProps {
  title?: string;
  titleMessageKey?: MessageKey;
  isLink?: boolean;
  to?: string;
  color?: "primary" | "secondary";
}

const ActionButton = (props: ActionButtonProps): ReactElement => {
  const {
    titleMessageKey,
    title,
    className,
    isLink,
    color = "primary",
    ...rest
  } = props;
  return (
    <Button
      {...rest}
      className={cn(
        "flex-none px-4 rounded-full bg-button-main font-extrabold uppercase text-primary-contrastText no-underline max-w-fit",
        {
          "bg-actionButton-main": color === "primary",
          "bg-actionButton-alternative ": color === "secondary",
        },
        className
      )}
      component={isLink ? Link : Button}
    >
      {titleMessageKey ? (
        <Trans<MessageKey> i18nKey={titleMessageKey} />
      ) : (
        title
      )}
    </Button>
  );
};

export default ActionButton;
