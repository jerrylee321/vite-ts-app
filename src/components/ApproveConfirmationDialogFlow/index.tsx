import { ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useSubmissionStateReturns } from "../../hooks/useFormSubmissionState";
import { DialogContent } from "../../models/dialog";
import ActionConfirmationDialogFlow from "../ActionConfirmationDialogFlow";

interface ApproveConfirmationDialogFlowProps<TRequestData, TResponseData>
  extends useSubmissionStateReturns<TRequestData, TResponseData> {
  onConfirmApprove: () => void;
  onComplete?: () => void;
}

const ApproveConfirmationDialogFlow = <TRequestData, TResponseData>(
  props: ApproveConfirmationDialogFlowProps<TRequestData, TResponseData>
): ReactElement => {
  const { onConfirmApprove, onComplete, ...submissionStateReturns } = props;
  const { t } = useTranslation();

  const confirmationDialogContent = useMemo<DialogContent>(() => {
    return {
      title: t("ApproveConfirmationDialogFlow.confirmationDialog.message"),
      primaryButtonLabel: t(
        "ApproveConfirmationDialogFlow.confirmationDialog.submitButton"
      ),
      secondaryButtonLabel: t(
        "ApproveConfirmationDialogFlow.confirmationDialog.backButton"
      ),
    };
  }, [t]);

  const submittedDialogContent = useMemo<DialogContent>(() => {
    return {
      title: t("ApproveConfirmationDialogFlow.submittedDialog.message"),
      primaryButtonLabel: t(
        "ApproveConfirmationDialogFlow.submittedDialog.confirmButton"
      ),
    };
  }, [t]);

  return (
    <ActionConfirmationDialogFlow
      {...submissionStateReturns}
      confirmationDialogContent={confirmationDialogContent}
      submittedDialogContent={submittedDialogContent}
      onConfirm={onConfirmApprove}
      onComplete={onComplete}
    />
  );
};

export default ApproveConfirmationDialogFlow;
