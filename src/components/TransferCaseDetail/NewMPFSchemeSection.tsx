import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import Accordion from "frontend-common/src/components/Accordion";
import ReadOnlyTextField from "frontend-common/src/components/ReadOnlyTextField";

import { MpfScheme } from "./models";

interface NewMPFSchemeSectionProps {
  mpfScheme: MpfScheme;
}

/**
 * @empfPortal trustee
 * @empfScreenID A13, A18, A19, A31, A32, A33, A34, A35, A36, C2, C3, C4
 * @empfComponent
 * @empfDesc It is a section component for new MPF scheme information of "Transfer Data Processing - Detail". It wraps the read only data components.
 * @empfProp mpfScheme
 * @empfConnMap Transfer in from ORSO Schemes - ORSO Transfer in Enquiry
 *
 * @empfPortal orso
 * @empfScreenID A13, A18, A19, A31, A32, A33, A34, A35, A36, C2, C3, C4
 * @empfComponent
 * @empfDesc It is a section component for new MPF scheme information of "Transfer Data Processing - Detail". It wraps the read only data components.
 * @empfProp mpfScheme
 * @empfConnMap Transfer in from ORSO Schemes - ORSO Transfer in Enquiry
 */
const NewMPFSchemeSection = (props: NewMPFSchemeSectionProps): ReactElement => {
  const { mpfScheme } = props;
  const {
    trusteeName,
    schemeName,
    employerName,
    employerAccountNumber,
    payrollGroupCode,
  } = mpfScheme;
  const { t } = useTranslation();

  return (
    <Accordion title={t("TransferCaseDetail.newMPFSchemeSection.title")}>
      <div className="grid grid-cols-12 gap-4">
        <ReadOnlyTextField
          className="col-span-6"
          label={t("TransferCaseDetail.newMPFSchemeSection.trusteeName.label")}
          value={trusteeName}
        />
        <ReadOnlyTextField
          className="col-span-6"
          label={t("TransferCaseDetail.newMPFSchemeSection.schemeName.label")}
          value={schemeName}
        />
        <ReadOnlyTextField
          className="col-span-6"
          label={t("TransferCaseDetail.newMPFSchemeSection.employerName.label")}
          value={employerName}
        />
        <ReadOnlyTextField
          className="col-span-6"
          label={t(
            "TransferCaseDetail.newMPFSchemeSection.employerAccountNumber.label"
          )}
          value={employerAccountNumber}
        />
        <ReadOnlyTextField
          className="col-span-6"
          label={t(
            "TransferCaseDetail.newMPFSchemeSection.payrollGroupCode.label"
          )}
          value={payrollGroupCode}
        />
      </div>
    </Accordion>
  );
};

export default NewMPFSchemeSection;
