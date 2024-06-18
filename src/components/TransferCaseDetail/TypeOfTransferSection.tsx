import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";

import {
  TransferCaseTransferType,
  transferTypeMessageIdMap,
} from "../../models/transferType";
import ReadOnlyTextField from "../ReadOnlyTextField";

interface TypeOfTransferSectionProps {
  transferType: TransferCaseTransferType;
}

/**
 * @empfPortal trustee
 * @empfScreenID A13, A18, A19, A31, A32, A33, A34, A35, A36
 * @empfComponent
 * @empfDesc It is a section component for type of transfer information of "Transfer Data Processing - Detail". It wraps the read only data components.
 * @empfProp transferType
 * @empfConnMap Transfer in from ORSO Schemes - ORSO Transfer in Enquiry
 *
 * @empfPortal orso
 * @empfScreenID A13, A18, A19, A31, A32, A33, A34, A35, A36
 * @empfComponent
 * @empfDesc It is a section component for type of transfer information of "Transfer Data Processing - Detail". It wraps the read only data components.
 * @empfProp transferType
 * @empfConnMap Transfer in from ORSO Schemes - ORSO Transfer in Enquiry
 */
const TypeOfTransferSection = (
  props: TypeOfTransferSectionProps
): ReactElement => {
  const { transferType } = props;
  const { t } = useTranslation();

  return (
    <section className="rounded-2xl bg-white px-8 py-7 shadow-md">
      <ReadOnlyTextField
        childTextClassName="text-xl text-primary-main"
        label={t(
          "TransferCaseDetail.typeOfTransferSection.typeOfTransfer.label"
        )}
        value={t(transferTypeMessageIdMap[transferType])}
      />
    </section>
  );
};

export default TypeOfTransferSection;
