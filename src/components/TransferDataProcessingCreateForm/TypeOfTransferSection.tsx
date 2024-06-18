import React, { ReactElement, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import FormSelect, {
  FormSelectOnChange,
  FormSelectOption,
} from "frontend-common/src/components/FormSelect";

import { transferTypeMessageIdMap } from "../../models/transferType";

import {
  allTransferDataProcessingTransferType,
  TransferDataProcessingTransferType,
  TransferDataProcessingTransferTypeSchema,
} from "./TransferDataProcessingCreateFormModel";

interface TypeOfTransferSectionProps {
  transferType: TransferDataProcessingTransferType | null;
  onTransferTypeChange: (v: TransferDataProcessingTransferType) => void;
}

/**
 * @empfPortal trustee
 * @empfScreenID A2, A3, A4, A6, A9, A20, A21, A22, A23, A24, A25, A28, A29, A30
 * @empfComponent
 * @empfDesc It is a section component for type of transfer information of "Transfer Data Processing - Create". It wraps the form components.
 * @empfProp transferType
 * @empfProp onTransferTypeChange
 * @empfConnMap Transfer in from ORSO Schemes - Transfer Data Processing
 *
 * @empfPortal orso
 * @empfDesc Create New Transfer Case Form - Type of Transfer
 * @empfScreenID A2, A3, A4, A6, A9, A20, A21, A22, A23, A24, A25, A28, A29, A30
 * @empfComponent
 * @empfDesc It is a section component for type of transfer information of "Transfer Data Processing - Create". It wraps the form components.
 * @empfProp transferType
 * @empfProp onTransferTypeChange
 * @empfConnMap Transfer in from ORSO Schemes - Transfer Data Processing
 */
const TypeOfTransferSection = (
  props: TypeOfTransferSectionProps
): ReactElement => {
  const { transferType, onTransferTypeChange } = props;
  const { t } = useTranslation();

  const transferTypeOptions = useMemo(() => {
    return allTransferDataProcessingTransferType.map((type) => ({
      key: type,
      label: t(transferTypeMessageIdMap[type]),
    }));
  }, [t]);

  const onTransferTypeSelectChange: FormSelectOnChange = useCallback(
    (ev, _) => {
      const newTransferType = ev.target.value;
      try {
        const validatedNewTransferType =
          TransferDataProcessingTransferTypeSchema.validateSync(
            newTransferType
          );
        onTransferTypeChange(validatedNewTransferType);
      } catch (err: unknown) {
        console.error(err);
      }
    },
    [onTransferTypeChange]
  );

  return (
    <section
      data-testid="TypeOfTransferSection"
      className="rounded-2xl bg-white px-8 py-7 shadow-md"
    >
      <FormSelect
        data-testid="transferType"
        id="transferType"
        name="transferType"
        className="w-full"
        nativeSelectClassName="text-xl text-primary-main font-bold"
        value={transferType ?? ""}
        onChange={onTransferTypeSelectChange}
        label={t("TransferDataProcessingCreateForm.transferType.label")}
        placeholder={t("FormInput.pleaseSelect")}
        required={true}
      >
        {transferTypeOptions.map((op) => (
          <FormSelectOption key={op.key} value={op.key}>
            {op.label}
          </FormSelectOption>
        ))}
      </FormSelect>
    </section>
  );
};

export default TypeOfTransferSection;
