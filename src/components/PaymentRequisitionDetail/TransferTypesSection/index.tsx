import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import Accordion from "frontend-common/src/components/Accordion";
import ReadOnlyTextField from "frontend-common/src/components/ReadOnlyTextField";

import { TransferType } from "../PaymentRequisitionContents";

const DefaultValue = "-";

interface TransferTypesSectionProps {
  transferType: TransferType;
}

const TransferTypesSection = ({
  transferType,
}: TransferTypesSectionProps): ReactElement => {
  const { t } = useTranslation();

  return (
    <Accordion className="bg-white" collapsible={false}>
      <ReadOnlyTextField
        label={t(
          "PaymentRequisitionDetailScreen.transferTypesSection.typesOfTransfer"
        )}
        value={
          transferType !== "Unknown"
            ? t(`PaymentRequisitionDetailScreen.typeOfTransfer.${transferType}`)
            : null
        }
        defaultValue={DefaultValue}
        className="flex-1"
        childTextClassName="!text-primary-main"
        data-testid="typesOfTransfer"
      />
    </Accordion>
  );
};

export default TransferTypesSection;
