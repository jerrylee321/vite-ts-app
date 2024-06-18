import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import Accordion from "frontend-common/src/components/Accordion";
import ReadOnlyTextField from "frontend-common/src/components/ReadOnlyTextField";

import { TransferInfo } from "./model";

interface TransferInfoSectionProps {
  transferTypeMap: Map<string, string>;
  data: TransferInfo;
}

/**
 * @empfPortal trustee
 * @empfConnMap Transfer in from ORSO Schemes - ORSO Transfer in Enquiry
 * @empfScreenID C2, C3, C4
 * @empfComponent
 * @empfDesc It is a section component for transfer info of "Transfer Data Processing - Detail". It wraps the read only data components.
 * @empfProp transferTypeMap
 * @empfProp data
 *
 * @empfPortal orso
 * @empfConnMap Transfer in from ORSO Schemes - ORSO Transfer in Enquiry
 * @empfScreenID C2, C3, C4
 * @empfComponent
 * @empfDesc It is a section component for transfer info of "Transfer Data Processing - Detail". It wraps the read only data components.
 * @empfProp transferTypeMap
 * @empfProp data
 */
const TransferInfoSection = (props: TransferInfoSectionProps): ReactElement => {
  const { transferTypeMap, data } = props;
  const { t } = useTranslation();
  return (
    <Accordion collapsible={false}>
      <div className="grid grid-cols-2 gap-4">
        <ReadOnlyTextField
          label={t("TransferEnquiryCaseDetail.TransferInfo.typeOfTransfer")}
          value={
            transferTypeMap.get(data.typeOfTransfer) ?? data.typeOfTransfer
          }
        />
        <ReadOnlyTextField
          label={t("TransferEnquiryCaseDetail.TransferInfo.referenceNumber")}
          value={data.referenceNumber}
        />
      </div>
    </Accordion>
  );
};
export default TransferInfoSection;
