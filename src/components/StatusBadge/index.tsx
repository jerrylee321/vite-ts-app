import React, { PropsWithChildren, ReactElement } from "react";
import { Trans } from "react-i18next";
import { Typography } from "@mui/material";
import cn from "classnames";

import { MessageKey } from "../../i18n/LocaleModel";
import Badge from "../Badge";

interface StatusBadgeProps extends PropsWithChildren {
  className?: string;
  title?: string;
  titleMessageKey?: MessageKey;
  "data-testid"?: string;
}

const StatusBadge = ({
  className,
  title = "",
  titleMessageKey,
  "data-testid": dataTestId,
}: StatusBadgeProps): ReactElement => {
  return (
    <Badge className={cn("px-4", className)} data-testid={dataTestId}>
      <Typography className="text-2xl font-bold uppercase text-primary-contrastText">
        {titleMessageKey ? (
          <Trans<MessageKey> i18nKey={titleMessageKey} />
        ) : (
          title
        )}
      </Typography>
    </Badge>
  );
};

export default StatusBadge;
