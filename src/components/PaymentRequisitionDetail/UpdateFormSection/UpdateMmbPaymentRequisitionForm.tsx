import { ReactElement, useCallback, useMemo } from "react";
import { Formik, FormikProps } from "formik";
import FormTable from "frontend-common/src/components/FormTable";
import useFormikErrorsWithModel from "frontend-common/src/hooks/useFormikErrorsWithModel";

import { CommonOption } from "../../../models/option";
import BenefitDetailsTableHeader from "../BenefitsDetailsTable/BenefitDetailsTableHeader";
import { getMmbBenefitsDetailsFormColumns } from "../BenefitsDetailsTable/getMmbBenefitsDetailsFormColumns";
import {
  MmbTransferViewModel,
  TransferType,
} from "../PaymentRequisitionContents";
import {
  FormTableName,
  getMmbUpdateFormInitialValues,
  UpdateFormModel,
  UpdateMmbPaymentRequisitionFormModel,
  UpdateMmbPaymentRequisitionFormSchema,
} from "../UpdateFormModel/UpdatePaymentRequisitionFormModel";

import PaymentDetailsSubForm from "./PaymentDetailsSubForm";
import TrusteeInputSubForm from "./TrusteeInputSubForm";
import UpdateActionBar from "./UpdateActionBar";

export const UpdateMmbPaymentRequisitionFormChildren = (
  props: FormikProps<UpdateMmbPaymentRequisitionFormModel> & {
    shouldShowTrusteeInputSubForm: boolean;
    onSave: (values: UpdateFormModel) => void;
    onUpload: (values: UpdateFormModel, file: File) => void;
    onDownloadTemplateClick: (transferType: TransferType) => void;
    summaryScreenPath: string;
    paymentMethodOptions: CommonOption[];
  }
): ReactElement => {
  const {
    handleSubmit,
    handleReset,
    values,
    touched,
    errors,
    shouldShowTrusteeInputSubForm,

    summaryScreenPath,
    paymentMethodOptions,
    onSave,
    onUpload,
    onDownloadTemplateClick,
  } = props;

  const { isErrors, helperTexts } = useFormikErrorsWithModel({
    errors,
    touched,
  });

  const handleSave = useCallback(() => {
    onSave(values);
  }, [onSave, values]);

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="UpdateMmbPaymentRequisitionForm"
      className="flex flex-col gap-section"
    >
      {shouldShowTrusteeInputSubForm ? (
        <TrusteeInputSubForm
          formikErrors={{ isErrors, helperTexts }}
          formikProps={props}
        />
      ) : null}

      <PaymentDetailsSubForm
        formikErrors={{ isErrors, helperTexts }}
        formikProps={props}
        onUpload={onUpload}
        onDownloadTemplateClick={onDownloadTemplateClick}
        paymentMethodOptions={paymentMethodOptions}
      >
        <FormTable
          columnsGetter={getMmbBenefitsDetailsFormColumns}
          data={values.benefitsDetails}
          isExportEnabled={false}
          isSelectEnabled={false}
          name={FormTableName}
          header={
            <BenefitDetailsTableHeader
              className="mt-8 mb-2"
              memberCount={values.benefitsDetails.length}
            />
          }
        />
      </PaymentDetailsSubForm>

      <UpdateActionBar
        handleReset={handleReset}
        handleSave={handleSave}
        summaryScreenPath={summaryScreenPath}
      />
    </form>
  );
};

interface UpdateMmbPaymentRequisitionFormProps {
  onSubmit: (values: UpdateFormModel) => void;
  onSave: (values: UpdateFormModel) => void;
  onUpload: (values: UpdateFormModel, file: File) => void;
  onDownloadTemplateClick: (transferType: TransferType) => void;
  viewModel: MmbTransferViewModel;
  summaryScreenPath: string;
  paymentMethodOptions: CommonOption[];

  className?: string;
}

export const UpdateMmbPaymentRequisitionForm = (
  props: UpdateMmbPaymentRequisitionFormProps
): ReactElement => {
  const {
    onSubmit,
    onSave,
    onUpload,
    onDownloadTemplateClick,
    className,
    viewModel,
    summaryScreenPath,
    paymentMethodOptions,
  } = props;

  const initialValues = useMemo(
    () => getMmbUpdateFormInitialValues(viewModel),
    [viewModel]
  );
  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        validationSchema={UpdateMmbPaymentRequisitionFormSchema}
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <UpdateMmbPaymentRequisitionFormChildren
            {...formikProps}
            onSave={onSave}
            onUpload={onUpload}
            onDownloadTemplateClick={onDownloadTemplateClick}
            shouldShowTrusteeInputSubForm={
              viewModel.transferRequest.followUp != null
            }
            summaryScreenPath={summaryScreenPath}
            paymentMethodOptions={paymentMethodOptions}
          />
        )}
      </Formik>
    </div>
  );
};
