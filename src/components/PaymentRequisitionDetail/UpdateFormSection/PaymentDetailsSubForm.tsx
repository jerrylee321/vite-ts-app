import { PropsWithChildren, ReactElement, useCallback, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { FormikProps } from "formik";
import Accordion from "frontend-common/src/components/Accordion";
import FormInput from "frontend-common/src/components/FormInput";
import FormSelect, {
  FormSelectOption,
} from "frontend-common/src/components/FormSelect";
import ReadOnlyTextField from "frontend-common/src/components/ReadOnlyTextField";
import UploadDataByBatchDialog from "frontend-common/src/components/UploadDataByBatchDialog";
import { FormikErrorsWithModelReturnType } from "frontend-common/src/hooks/useFormikErrorsWithModel";

import { CommonOption } from "../../../models/option";
import { TransferType } from "../PaymentRequisitionContents";
import { UpdateFormModel } from "../UpdateFormModel/UpdatePaymentRequisitionFormModel";

export const templateFileNameByTransferType: Record<TransferType, string> = {
  MmbTransfer: "MMB Transfer.xlsx",
  SchemeTransfer: "Scheme Transfer.xlsx",
  IntraGroupTransfer: "Intra Group Transfer.xlsx",
  Unknown: "file.xlsx",
};

interface PaymentDetailsSubFormProps<T extends UpdateFormModel> {
  formikProps: FormikProps<T>;
  formikErrors: FormikErrorsWithModelReturnType<T>;
  paymentMethodOptions: CommonOption[];
  onUpload: (values: UpdateFormModel, file: File) => void;
  onDownloadTemplateClick: (transferType: TransferType) => void;
}

const PaymentDetailsSubForm = <T extends UpdateFormModel>(
  props: PropsWithChildren<PaymentDetailsSubFormProps<T>>
): ReactElement => {
  const {
    children,
    formikProps,
    formikErrors,
    paymentMethodOptions,
    onUpload,
    onDownloadTemplateClick,
  } = props;
  const { values, handleChange, handleBlur } = formikProps;
  const { isErrors, helperTexts } = formikErrors;
  const { t } = useTranslation();

  const [uploadDialogOpen, setUploadDialogOpen] = useState<boolean>(false);

  const onStartUploadClick = useCallback(() => {
    setUploadDialogOpen(true);
  }, []);

  const onCloseUploadDialog = useCallback(() => {
    setUploadDialogOpen(false);
  }, []);

  const onConfirmUploadFile = useCallback(
    (files: File[]) => {
      onUpload(values, files[0]);
    },
    [onUpload, values]
  );

  const handleDownloadTemplateClick = useCallback(() => {
    onDownloadTemplateClick(values.transferType);
  }, [onDownloadTemplateClick, values.transferType]);

  return (
    <Accordion
      title={t("PaymentRequisitionDetailScreen.PaymentDetails.title")}
      collapsible={false}
    >
      <div className="grid grid-cols-12 gap-4">
        <ReadOnlyTextField
          className="col-span-3"
          label={t(
            "PaymentRequisitionDetailScreen.PaymentDetails.billingRefNo.label"
          )}
          defaultValue="-"
          value={values.billRefNo}
        />
        <FormSelect
          required={true}
          fullWidth={true}
          id="paymentMethod"
          className="col-span-3"
          data-testid="paymentMethod"
          name="paymentMethod"
          label={t(
            "PaymentRequisitionDetailScreen.PaymentDetails.paymentMethod.label"
          )}
          variant="standard"
          value={values.paymentMethod}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isErrors.paymentMethod}
          helperText={helperTexts.paymentMethod}
        >
          {paymentMethodOptions.map((paymentMethodOption) => (
            <FormSelectOption
              key={paymentMethodOption.key}
              value={paymentMethodOption.key}
            >
              {paymentMethodOption.name}
            </FormSelectOption>
          ))}
        </FormSelect>
        <FormInput
          required={true}
          fullWidth={true}
          id="bankName"
          data-testid="bankName"
          name="bankName"
          className="col-span-3"
          label={t(
            "PaymentRequisitionDetailScreen.PaymentDetails.bankName.label"
          )}
          value={values.bankName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isErrors.bankName}
          helperText={helperTexts.bankName}
        />
        <FormInput
          required={true}
          fullWidth={true}
          id="bankAcctNo"
          data-testid="bankAcctNo"
          name="bankAcctNo"
          className="col-span-3"
          label={t(
            "PaymentRequisitionDetailScreen.PaymentDetails.bankAccountNumber.label"
          )}
          value={values.bankAcctNo}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isErrors.bankAcctNo}
          helperText={helperTexts.bankAcctNo}
        />
        <FormInput
          fullWidth={true}
          id="chequeNo"
          data-testid="chequeNo"
          name="chequeNo"
          className="col-span-3"
          label={t(
            "PaymentRequisitionDetailScreen.PaymentDetails.chequeNumber.label"
          )}
          value={values.chequeNo}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isErrors.chequeNo}
          helperText={helperTexts.chequeNo}
        />
        <FormInput
          required={true}
          fullWidth={true}
          type="number"
          id="totalPaymentAmount"
          data-testid="totalPaymentAmount"
          name="totalPaymentAmount"
          className="col-span-3"
          label={t(
            "PaymentRequisitionDetailScreen.PaymentDetails.totalPaymentAmount.label"
          )}
          value={values.totalPaymentAmount}
          onChange={handleChange}
          onBlur={handleBlur}
          error={isErrors.totalPaymentAmount}
          helperText={helperTexts.totalPaymentAmount}
          inputProps={{
            min: 0,
            step: 0.01,
          }}
        />
        <Button
          className="col-span-full mt-4 max-w-fit flex-none rounded-full bg-primary-light px-4 font-extrabold uppercase text-primary-contrastText"
          data-testid="uploadDataByBatchButton"
          onClick={onStartUploadClick}
        >
          <Trans i18nKey="PaymentRequisitionDetailScreen.PaymentDetails.action.uploadDataByBatch" />
        </Button>
      </div>
      {children}
      <UploadDataByBatchDialog
        maxFiles={1}
        downloadTemplateName={
          templateFileNameByTransferType[values.transferType]
        }
        dialogProps={{ open: uploadDialogOpen }}
        onClose={onCloseUploadDialog}
        onConfirm={onConfirmUploadFile}
        onDownloadTemplateClick={handleDownloadTemplateClick}
      />
    </Accordion>
  );
};

export default PaymentDetailsSubForm;
