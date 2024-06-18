import React, { ReactElement } from "react";
import { Trans, useTranslation } from "react-i18next";
import Accordion from "frontend-common/src/components/Accordion";
import HeadlineText from "frontend-common/src/components/HeadlineText";
import ReadOnlyTextField from "frontend-common/src/components/ReadOnlyTextField";

import { TransferCaseTransferType } from "../../models/transferType";

import { OrsoScheme } from "./models";

interface OriginalORSOSchemeSectionProps {
  orsoScheme: OrsoScheme;
  transferType: TransferCaseTransferType;
}

/**
 * @empfPortal trustee
 * @empfScreenID A13, A18, A19, A31, A32, A33, A34, A35, A36, C2, C3
 * @empfComponent
 * @empfDesc It is a section component for original ORSO scheme information of "Transfer Data Processing - Detail". It wraps the read only data components.
 * @empfProp orsoScheme
 * @empfProp transferType
 * @empfConnMap Transfer in from ORSO Schemes - ORSO Transfer in Enquiry
 *
 * @empfPortal orso
 * @empfScreenID A13, A18, A19, A31, A32, A33, A34, A35, A36, C2, C3
 * @empfComponent
 * @empfDesc It is a section component for original ORSO scheme information of "Transfer Data Processing - Detail". It wraps the read only data components.
 * @empfProp orsoScheme
 * @empfProp transferType
 * @empfConnMap Transfer in from ORSO Schemes - ORSO Transfer in Enquiry
 */
const OriginalORSOSchemeSection = (
  props: OriginalORSOSchemeSectionProps
): ReactElement => {
  const { orsoScheme, transferType } = props;
  const {
    trusteeName,
    schemeName,
    registrationNumber,
    employerName,
    employerAccountNumber,
    trusteeAddress,
    transferEffectiveDate,
  } = orsoScheme;
  const { t } = useTranslation();
  return (
    <Accordion title={t("TransferCaseDetail.originalORSOSchemeSection.title")}>
      <div className="grid grid-cols-12 gap-4">
        <ReadOnlyTextField
          className="col-span-6"
          label={t(
            "TransferCaseDetail.originalORSOSchemeSection.trusteeName.label"
          )}
          value={trusteeName}
        />
        <ReadOnlyTextField
          className="col-span-6"
          label={t(
            "TransferCaseDetail.originalORSOSchemeSection.schemeName.label"
          )}
          value={schemeName}
        />
        <ReadOnlyTextField
          className="col-span-3"
          label={t(
            "TransferCaseDetail.originalORSOSchemeSection.registrationNumber.label"
          )}
          value={registrationNumber}
        />
        <ReadOnlyTextField
          className="col-span-3"
          label={t(
            "TransferCaseDetail.originalORSOSchemeSection.employerName.label"
          )}
          value={employerName}
        />
        <ReadOnlyTextField
          className="col-span-3"
          label={t(
            "TransferCaseDetail.originalORSOSchemeSection.employerAccountNumber.label"
          )}
          value={employerAccountNumber}
        />
        {transferType === "MMB" ? null : (
          <ReadOnlyTextField
            className="col-span-3"
            label={t(
              "TransferCaseDetail.originalORSOSchemeSection.transferEffectiveDate.label"
            )}
            value={transferEffectiveDate}
            dateFormat="dd/MM/yyyy"
          />
        )}

        <section className="col-span-12 mb-4 grid grid-cols-12 gap-4">
          <HeadlineText variant="h4" className="col-span-12 mb-2">
            <Trans i18nKey="TransferCaseDetail.originalORSOSchemeSection.trusteeAddress.title" />
          </HeadlineText>
          <ReadOnlyTextField
            className="col-span-6"
            label={t("TrusteeAddress.field.country")}
            value={trusteeAddress?.country}
          />
          <ReadOnlyTextField
            className="col-span-6"
            label={t("TrusteeAddress.field.city")}
            value={trusteeAddress?.city}
          />
          <ReadOnlyTextField
            className="col-span-3"
            label={t("TrusteeAddress.field.room")}
            value={trusteeAddress?.room}
          />
          <ReadOnlyTextField
            className="col-span-3"
            label={t("TrusteeAddress.field.floor")}
            value={trusteeAddress?.floor}
          />
          <ReadOnlyTextField
            className="col-span-3"
            label={t("TrusteeAddress.field.block")}
            value={trusteeAddress?.block}
          />
          <ReadOnlyTextField
            className="col-span-6"
            label={t("TrusteeAddress.field.building")}
            value={trusteeAddress?.building}
          />
          <ReadOnlyTextField
            className="col-span-6"
            label={t("TrusteeAddress.field.street")}
            value={trusteeAddress?.street}
          />
          <ReadOnlyTextField
            className="col-span-6"
            label={t("TrusteeAddress.field.district")}
            value={trusteeAddress?.district}
          />
          <ReadOnlyTextField
            className="col-span-6"
            label={t("TrusteeAddress.field.postalCode")}
            value={trusteeAddress?.postCode}
          />
        </section>
      </div>
    </Accordion>
  );
};

export default OriginalORSOSchemeSection;
