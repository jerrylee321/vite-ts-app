import React, { useCallback, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Checkbox, Typography } from "@mui/material";
import MessageDialogWithActions from "frontend-common/src/components/MessageDialogWithActions";
import { SubmissionState } from "frontend-common/src/hooks/useFormSubmissionState";

import { MessageKey } from "../../i18n/LocaleModel";

interface Props<TRequestData, TResponseData> {
  submissionState: SubmissionState<TRequestData, TResponseData>;

  requireConsent?: boolean;
  consentMessageKey?: MessageKey;

  confirmTitleMessageKey: MessageKey;
  onConfirmClose: () => void;
  confirmBackMessageKey: MessageKey;
  confirmBackTestId?: string;
  confirmSubmitMessageKey: MessageKey;
  confirmSubmitTestId?: string;
  onConfirm: () => void;

  confirmSuccessTitleMessageKey: MessageKey;
  onConfirmSuccessClose: () => void;
  confirmSuccessOkButtonMessageKey: MessageKey;
  confirmSuccessOkButtonTestId?: string;
}

const SubmitDialogsFlow = <TRequestData, TResponseData>(
  props: Props<TRequestData, TResponseData>
): React.ReactElement => {
  const {
    requireConsent,
    consentMessageKey,
    confirmBackMessageKey,
    confirmBackTestId,
    confirmSubmitMessageKey,
    confirmSubmitTestId,
    confirmSuccessOkButtonMessageKey,
    confirmSuccessOkButtonTestId,
    confirmSuccessTitleMessageKey,
    confirmTitleMessageKey,
    onConfirm,
    onConfirmClose,
    onConfirmSuccessClose,
    submissionState,
  } = props;
  const { t } = useTranslation();

  const [consentChecked, setConsentChecked] = useState(false);

  const onConsentCheckboxChange = useCallback(
    (_ev: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setConsentChecked(checked);
    },
    []
  );

  return (
    <>
      <MessageDialogWithActions
        data-testid="submitDialog"
        title={t(confirmTitleMessageKey)}
        icon="question"
        open={
          submissionState.state === "toBeConfirmed" ||
          submissionState.state === "submitting"
        }
        onClose={onConfirmClose}
        buttons={[
          {
            text: t(confirmBackMessageKey).toUpperCase(),
            disabled: submissionState.state === "submitting",
            style: "secondary",
            "data-testid": confirmBackTestId,
          },
          {
            text: t(confirmSubmitMessageKey).toUpperCase(),
            style: "primary",
            disabled:
              submissionState.state === "submitting" ||
              (requireConsent && !consentChecked),
            stayOpen: true,
            onSelect: onConfirm,
            "data-testid": confirmSubmitTestId,
          },
        ]}
      >
        {requireConsent ? (
          <div className="flex items-start">
            <Checkbox
              data-testid="submitDialogConsentCheckbox"
              checked={consentChecked}
              onChange={onConsentCheckboxChange}
            />
            <Typography variant="caption" className="pt-2 text-xs leading-4">
              <Trans<MessageKey> i18nKey={consentMessageKey} />
            </Typography>
          </div>
        ) : null}
      </MessageDialogWithActions>

      <MessageDialogWithActions
        data-testid="submittedDialog"
        title={t(confirmSuccessTitleMessageKey)}
        icon="success"
        open={submissionState.state === "submitted"}
        onClose={onConfirmSuccessClose}
        buttons={[
          {
            text: t(confirmSuccessOkButtonMessageKey).toUpperCase(),
            style: "primary",
            "data-testid": confirmSuccessOkButtonTestId,
          },
        ]}
      />
    </>
  );
};

export default SubmitDialogsFlow;
