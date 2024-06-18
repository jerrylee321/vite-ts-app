import React, { ReactElement, useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";

interface ConsentSectionProps {
  isConsentAccepted: boolean;
  onIsConsentAcceptedChange?: (accepted: boolean) => void;
  isReadOnly: boolean;
}

/**
 * @empfPortal trustee
 * @empfScreenID A13, A18, A19, A31, A32, A33, A34, A35, A36
 * @empfComponent
 * @empfDesc It is a section component for consent of "Transfer Data Processing - Detail". It wraps the form components.
 * @empfProp isConsentAccepted
 * @empfProp onIsConsentAcceptedChange
 * @empfProp isReadOnly
 * @empfConnMap Transfer in from ORSO Schemes - ORSO Transfer in Enquiry
 *
 * @empfPortal orso
 * @empfScreenID A13, A18, A19, A31, A32, A33, A34, A35, A36
 * @empfComponent
 * @empfDesc It is a section component for consent of "Transfer Data Processing - Detail". It wraps the form components.
 * @empfProp isConsentAccepted
 * @empfProp onIsConsentAcceptedChange
 * @empfProp isReadOnly
 * @empfConnMap Transfer in from ORSO Schemes - ORSO Transfer in Enquiry
 */
const ConsentSection = (props: ConsentSectionProps): ReactElement => {
  const { isConsentAccepted, onIsConsentAcceptedChange, isReadOnly } = props;
  const { t } = useTranslation();

  const onConsentCheckboxChanged = useCallback<
    NonNullable<SwitchBaseProps["onChange"]>
  >(
    (_ev, checked) => {
      onIsConsentAcceptedChange?.(checked);
    },
    [onIsConsentAcceptedChange]
  );

  return (
    <section className="rounded-2xl bg-white px-8 py-6 shadow-md">
      <Typography
        variant="h5"
        className="mb-2 text-xl font-bold text-primary-main"
      >
        <Trans i18nKey="TransferCaseDetail.consentSection.title" />
      </Typography>
      <FormControlLabel
        data-testid="isConsentAcceptedCheckboxLabel"
        className="items-start"
        control={
          <Checkbox
            data-testid="isConsentAccepted"
            id="isConsentAccepted"
            className="py-0 pr-1.5"
            name="isConsentAccepted"
            checked={isConsentAccepted}
            onChange={onConsentCheckboxChanged}
            readOnly={isReadOnly}
            disabled={isReadOnly}
          />
        }
        label={
          <Typography
            data-testid="isConsentAcceptedCheckboxLabelText"
            variant="caption"
            className="text-independence-main"
          >
            {t("TransferCaseDetail.consentSection.consent.label")}
          </Typography>
        }
      />
    </section>
  );
};

export default ConsentSection;
