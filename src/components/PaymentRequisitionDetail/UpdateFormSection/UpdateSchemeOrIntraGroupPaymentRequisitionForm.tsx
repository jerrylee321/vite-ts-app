import { ReactElement, useCallback, useMemo } from "react";
import { Formik, FormikProps } from "formik";
import FormTable from "frontend-common/src/components/FormTable";
import useFormikErrorsWithModel from "frontend-common/src/hooks/useFormikErrorsWithModel";

import { CommonOption } from "../../../models/option";
import BenefitDetailsTableHeader from "../BenefitsDetailsTable/BenefitDetailsTableHeader";
import { getSchemeOrIntraGroupBenefitsDetailsFormColumns } from "../BenefitsDetailsTable/getSchemeOrIntraGroupBenefitsDetailsFormColumns";
import {
  IntraGroupTransferViewModel,
  SchemeTransferViewModel,
  TransferType,
} from "../PaymentRequisitionContents";
import {
  FormTableName,
  getIntraGroupUpdateFormInitialValues,
  getSchemeUpdateFormInitialValues,
  UpdateFormModel,
  UpdateIntraGroupPaymentRequisitionFormModel,
  UpdateIntraGroupPaymentRequisitionFormSchema,
  UpdateSchemePaymentRequisitionFormModel,
  UpdateSchemePaymentRequisitionFormSchema,
} from "../UpdateFormModel/UpdatePaymentRequisitionFormModel";

import PaymentDetailsSubForm from "./PaymentDetailsSubForm";
import TrusteeInputSubForm from "./TrusteeInputSubForm";
import UpdateActionBar from "./UpdateActionBar";

export const UpdateSchemeOrIntraGroupPaymentRequisitionFormChildren = (
  props: FormikProps<
    | UpdateSchemePaymentRequisitionFormModel
    | UpdateIntraGroupPaymentRequisitionFormModel
  > & {
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
    values,
    touched,
    errors,
    shouldShowTrusteeInputSubForm,
    handleReset,

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
      data-testid="UpdateSchemeOrIntraGroupPaymentRequisitionForm"
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
          columnsGetter={getSchemeOrIntraGroupBenefitsDetailsFormColumns}
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

interface UpdateSchemeOrIntraGroupPaymentRequisitionFormProps {
  onSubmit: (values: UpdateFormModel) => void;
  onSave: (values: UpdateFormModel) => void;
  onUpload: (values: UpdateFormModel, file: File) => void;
  onDownloadTemplateClick: (transferType: TransferType) => void;
  viewModel: SchemeTransferViewModel | IntraGroupTransferViewModel;
  summaryScreenPath: string;
  paymentMethodOptions: CommonOption[];
  className?: string;
}

export const UpdateSchemeOrIntraGroupPaymentRequisitionForm = (
  props: UpdateSchemeOrIntraGroupPaymentRequisitionFormProps
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

  const initialValues = useMemo(() => {
    return viewModel.transferType === "SchemeTransfer"
      ? getSchemeUpdateFormInitialValues(viewModel)
      : getIntraGroupUpdateFormInitialValues(viewModel);
  }, [viewModel]);
  return (
    <div className={className}>
      <Formik
        initialValues={initialValues}
        validationSchema={
          viewModel.transferType === "SchemeTransfer"
            ? UpdateSchemePaymentRequisitionFormSchema
            : UpdateIntraGroupPaymentRequisitionFormSchema
        }
        onSubmit={onSubmit}
      >
        {(formikProps) => (
          <UpdateSchemeOrIntraGroupPaymentRequisitionFormChildren
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
