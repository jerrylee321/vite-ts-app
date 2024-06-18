import { ReactElement, useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";

import { SubmissionState } from "../../hooks/useFormSubmissionState";
import { fallback } from "../../types/Nullable";
import MessageDialogWithActions from "../MessageDialogWithActions";

export interface Data {
  schemeName: string | null;
  functionName: string | null;
  roleType: string | null;
}

interface Props {
  data: Data | null;
  submissionState: SubmissionState<void, void>;
  onClose: () => void;
  onConfirm: () => void;
}
const ConfirmDeleteSoleUserDialog = (props: Props): ReactElement => {
  const { data, submissionState, onClose, onConfirm } = props;

  const { t } = useTranslation();

  const handleConfirm = useCallback(() => {
    if (submissionState.state === "toBeConfirmed") {
      onConfirm();
    }
  }, [onConfirm, submissionState]);

  return (
    <MessageDialogWithActions
      data-testid="ManageAccessRight.confirmDeleteSoleUserDialog"
      title={
        <div className="mb-1">
          <Typography className="text-2xl text-lightRed-main">
            {fallback(data?.schemeName, "N/A")}
          </Typography>
          <Typography className="leading-5 text-lightRed-main">
            <Trans i18nKey="ManageAccessRight.confirmDeleteSoleUserDialog.afterDeletedNoUserFor" />{" "}
          </Typography>
          <Typography className="font-bold leading-5 text-lightRed-main">
            <Trans
              i18nKey="ManageAccessRight.confirmDeleteSoleUserDialog.funcNameAndRole"
              values={{
                functionName: fallback(data?.functionName, "N/A"),
                role: fallback(data?.roleType, "N/A"),
              }}
            />
          </Typography>
        </div>
      }
      body={
        <Typography className="font-bold text-independence-main">
          {t("ManageAccessRight.confirmDeleteSoleUserDialog.body")}
        </Typography>
      }
      icon="system-alert-important"
      open={
        submissionState.state === "toBeConfirmed" ||
        submissionState.state === "submitting"
      }
      onClose={onClose}
      buttons={[
        {
          text: t("ManageAccessRight.confirmDeleteSoleUserDialog.buttons.back"),
          style: "secondary",
          disabled: submissionState.state !== "toBeConfirmed",
          "data-testid":
            "ManageAccessRight.confirmDeleteSoleUserDialog.buttons.back",
        },
        {
          text: t(
            "ManageAccessRight.confirmDeleteSoleUserDialog.buttons.confirm"
          ),
          style: "primary",
          onSelect: handleConfirm,
          disabled: submissionState.state !== "toBeConfirmed",
          "data-testid":
            "ManageAccessRight.confirmDeleteSoleUserDialog.buttons.confirm",
          stayOpen: true,
        },
      ]}
    />
  );
};

export default ConfirmDeleteSoleUserDialog;
