import { ReactElement, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { IIdleTimer } from "react-idle-timer";
import { Typography } from "@mui/material";

import MessageDialogWithActions from "../MessageDialogWithActions";

interface IdleAlertDialogProps {
  open: boolean;
  onClose: () => void;
  onSelectLogout: () => void;
  idleTimer: IIdleTimer;
}

const IdleAlertDialog = (props: IdleAlertDialogProps): ReactElement => {
  const { open, onClose, onSelectLogout, idleTimer } = props;
  const { t } = useTranslation();

  const [remainingSeconds, setRemainingSeconds] = useState(
    Math.ceil(idleTimer.getRemainingTime() / 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      // Use `ceil` instead of `floor`, otherwise the user will be shown
      // “will be logged out in 0 seconds”.
      setRemainingSeconds(Math.ceil(idleTimer.getRemainingTime() / 1000));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [idleTimer]);

  return (
    <MessageDialogWithActions
      open={open}
      onClose={onClose}
      title={
        <Typography className="font-bold text-error-light">
          <Trans
            i18nKey="IdleAlertDialog.body"
            values={{ remainingSeconds: remainingSeconds }}
          />
        </Typography>
      }
      icon="system-alert-important"
      buttons={[
        {
          text: t("IdleAlertDialog.logout"),
          "data-testid": "logoutButton",
          style: "secondary",
          onSelect: onSelectLogout,
          className: "normal-case",
        },
        {
          text: t("IdleAlertDialog.dismiss"),
          "data-testid": "dismissButton",
          style: "primary",
          className: "normal-case",
        },
      ]}
    />
  );
};

export default IdleAlertDialog;
