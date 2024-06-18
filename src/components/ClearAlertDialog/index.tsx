import { ReactElement } from "react";
import { Trans, useTranslation } from "react-i18next";

import { ReactComponent as WarningAlertIcon } from "../../assets/icons/warning-alert.svg";
import DialogWithActions from "../DialogWithActions";

interface ClearAlertDialogProps {
  isConfirmDialogOpen: boolean;
  onCloseDialog: () => void;
  onConfirmClick: () => void;
}

const ClearAlertDialog = (props: ClearAlertDialogProps): ReactElement => {
  const { t } = useTranslation();
  const { isConfirmDialogOpen, onCloseDialog, onConfirmClick } = props;

  return (
    <DialogWithActions
      open={isConfirmDialogOpen}
      onClose={onCloseDialog}
      data-testid="comfirmDialog"
      buttons={[
        {
          text: t("ActionDialog.back"),
          style: "secondary",
          "data-testid": "actionDialogBackBtn",
        },
        {
          text: t("ActionDialog.confirm"),
          style: "primary",
          "data-testid": "actionDialogConfirmBtn",
          onSelect: onConfirmClick,
        },
      ]}
    >
      <div className="flex items-center justify-center">
        <div className="mr-4" data-testid="WarningAlertIcon">
          <WarningAlertIcon className="scale-75" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-error-light" data-testid="ClearAlertMessage">
            <Trans i18nKey="ClearAlert.message" />
          </div>
          <div
            className="font-bold text-metalicBlue-main"
            data-testid="ClearAlertConfirmation"
          >
            <Trans i18nKey="ClearAlert.confirm" />
          </div>
        </div>
      </div>
    </DialogWithActions>
  );
};

export default ClearAlertDialog;
