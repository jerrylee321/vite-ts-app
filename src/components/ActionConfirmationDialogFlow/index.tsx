import { ReactElement, useCallback } from "react";

import { useSubmissionStateReturns } from "../../hooks/useFormSubmissionState";
import { DialogButtonStyle } from "../DialogWithActions";
import MessageDialogWithActions, {
  DialogIconType,
} from "../MessageDialogWithActions";

export interface DialogContent {
  title: ReactElement | string;
  body?: string;
  primaryButtonLabel: string;
  primaryButtonStyle?: DialogButtonStyle;
  secondaryButtonLabel?: string;
  secondaryButtonStyle?: DialogButtonStyle;
}

interface ActionConfirmationDialogFlowProps<TRequestData, TResponseData>
  extends useSubmissionStateReturns<TRequestData, TResponseData> {
  confirmationDialogContent: DialogContent;
  submittedDialogContent: DialogContent;
  onConfirm: () => void;
  onComplete?: () => void;
  icon?: DialogIconType;
}

const ActionConfirmationDialogFlow = <TRequestData, TResponseData>(
  props: ActionConfirmationDialogFlowProps<TRequestData, TResponseData>
): ReactElement => {
  const {
    submissionState,
    switchToStateInitial,
    confirmationDialogContent,
    submittedDialogContent,
    onConfirm,
    onComplete,
    icon = "question",
  } = props;

  const onCloseConfirmationDialog = useCallback(() => {
    switchToStateInitial();
  }, [switchToStateInitial]);

  const onCloseSubmittedDialog = useCallback(() => {
    if (submissionState.state === "submitted" && onComplete !== undefined) {
      onComplete();
    }
    switchToStateInitial();
  }, [onComplete, submissionState.state, switchToStateInitial]);

  const onConfirmAction = useCallback(() => {
    onConfirm();
  }, [onConfirm]);

  return (
    <>
      <MessageDialogWithActions
        data-testid="confirmationDialog"
        title={confirmationDialogContent.title}
        body={confirmationDialogContent.body}
        icon={icon}
        open={submissionState.state === "toBeConfirmed"}
        onClose={onCloseConfirmationDialog}
        buttons={[
          {
            text: confirmationDialogContent.secondaryButtonLabel ?? "",
            style:
              confirmationDialogContent.secondaryButtonStyle ?? "secondary",
            disabled: submissionState.state !== "toBeConfirmed",
            "data-testid": "confirmDialogBackBtn",
          },
          {
            text: confirmationDialogContent.primaryButtonLabel,
            style: confirmationDialogContent.primaryButtonStyle ?? "primary",
            onSelect: onConfirmAction,
            disabled: submissionState.state !== "toBeConfirmed",
            "data-testid": "confirmDialogSubmitBtn",
          },
        ]}
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
            style: submittedDialogContent.primaryButtonStyle ?? "primary",
            "data-testid": "submittedDialogConfirmBtn",
          },
        ]}
      />
    </>
  );
};

export default ActionConfirmationDialogFlow;
