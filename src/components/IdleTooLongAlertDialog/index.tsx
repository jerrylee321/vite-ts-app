import { ReactElement } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

import MessageDialogWithActions from "../MessageDialogWithActions";

interface IdleTooLongAlertDialogProps {
  open: boolean;
  onClose: () => void;
}

const IdleTooLongAlertDialog = (
  props: IdleTooLongAlertDialogProps
): ReactElement => {
  const { open, onClose } = props;
  const { t } = useTranslation();

  return (
    <MessageDialogWithActions
      open={open}
      onClose={onClose}
      title={
        <Typography className="font-bold text-error-light">
          <Trans i18nKey="IdleTooLongAlertDialog.body" />
        </Typography>
      }
      icon="system-alert-important"
      buttons={[
        {
          text: t("IdleTooLongAlertDialog.dismiss"),
          "data-testid": "dismissButton",
          style: "primary",
        },
      ]}
    />
  );
};

export default IdleTooLongAlertDialog;
