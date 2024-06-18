import { ReactElement } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

import { ReactComponent as WarningAlertIcon } from "../../assets/icons/warning-alert.svg";
import DialogWithActions from "../DialogWithActions";

interface DeleteUserGroupFailDialogProps {
  isDialogOpen: boolean;
  onCloseDialog: () => void;
}

const DeleteUserGroupFailDialog = (
  props: DeleteUserGroupFailDialogProps
): ReactElement => {
  const { isDialogOpen, onCloseDialog } = props;
  const { t } = useTranslation();

  return (
    <DialogWithActions
      open={isDialogOpen}
      onClose={onCloseDialog}
      data-testid="comfirmDialog"
      buttons={[
        {
          text: t("DeleteUserGroupFailDialog.button"),
          style: "primary",
          "data-testid": "actionDialogConfirmBtn",
        },
      ]}
    >
      <div className="flex items-center justify-center">
        <div className="mr-4" data-testid="WarningAlertIcon">
          <WarningAlertIcon className="scale-75" />
        </div>
        <div className="flex flex-col">
          <Typography
            className="text-xl text-error-light"
            data-testid="DeleteUserGroupFailDialogMessage"
          >
            <Trans i18nKey="DeleteUserGroupFailDialog.message" />
          </Typography>
          <Typography
            className="text-sm font-bold text-error-light"
            data-testid="DeleteUserGroupFailDialogReminder"
          >
            <Trans i18nKey="DeleteUserGroupFailDialog.reminder" />
          </Typography>
        </div>
      </div>
    </DialogWithActions>
  );
};

export default DeleteUserGroupFailDialog;
