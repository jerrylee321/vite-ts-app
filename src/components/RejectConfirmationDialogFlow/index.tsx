import { ReactElement, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { RejectType } from "../../apis/models/RejectOptions";
import { useSubmissionStateReturns } from "../../hooks/useFormSubmissionState";
import { DialogContent } from "../../models/dialog";
import MessageDialogWithActions from "../MessageDialogWithActions";
import RejectDialog from "../RejectDialog";

interface RejectConfirmationDialogFlowProps<
  TRequestData,
  TResponseData,
  TSubmissionData
> extends useSubmissionStateReturns<
    TRequestData,
    TResponseData,
    TSubmissionData
  > {
  onConfirmReject: (reason: string, type: RejectType) => void;
  onComplete?: () => void;
  /**
   * If not provided, default is [RejectType.redo, RejectType.abandon]
   */
  rejectTypes?: RejectType[];
  isReasonRequired?: boolean;
}

const RejectConfirmationDialogFlow = <
  TRequestData,
  TResponseData,
  TSubmissionData
>(
  props: RejectConfirmationDialogFlowProps<
    TRequestData,
    TResponseData,
    TSubmissionData
  >
): ReactElement => {
  const {
    submissionState,
    switchToStateInitial,
    onConfirmReject,
    onComplete,
    rejectTypes,
    isReasonRequired = false,
  } = props;

  const { t } = useTranslation();

  const submittedDialogContent = useMemo<DialogContent>(() => {
    return {
      title: t("RejectConfirmationDialogFlow.submittedDialog.message"),
      primaryButtonLabel: t(
        "RejectConfirmationDialogFlow.submittedDialog.confirmButton"
      ),
    };
  }, [t]);

  const onCloseConfirmationDialog = useCallback(() => {
    switchToStateInitial();
  }, [switchToStateInitial]);

  const onCloseSubmittedDialog = useCallback(() => {
    if (submissionState.state === "submitted" && onComplete !== undefined) {
      onComplete();
    }
    switchToStateInitial();
  }, [onComplete, submissionState.state, switchToStateInitial]);

  return (
    <>
      <RejectDialog
        data-testid="ConfirmationRejectDialog"
        title="RejectConfirmDialog.title"
        open={
          submissionState.state === "toBeConfirmed" ||
          submissionState.state === "submitting"
        }
        onClose={onCloseConfirmationDialog}
        onSubmitReject={onConfirmReject}
        isSubmiting={submissionState.state === "submitting"}
        rejectTypes={rejectTypes}
        isReasonRequired={isReasonRequired}
      />
      <MessageDialogWithActions
        data-testid="submittedDialog"
        title={submittedDialogContent.title}
        body={submittedDialogContent.body}
        icon="success"
        open={submissionState.state === "submitted"}
        onClose={onCloseSubmittedDialog}
        buttons={[
          {
            text: submittedDialogContent.primaryButtonLabel,
            style: "primary",
            "data-testid": "submittedDialogConfirmBtn",
          },
        ]}
      />
    </>
  );
};

export default RejectConfirmationDialogFlow;
