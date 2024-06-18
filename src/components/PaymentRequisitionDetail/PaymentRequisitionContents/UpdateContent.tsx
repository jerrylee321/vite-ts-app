import { ReactElement } from "react";

import { CommonOption } from "../../../models/option";
import TransferRequestInfoSection from "../TransferRequestInfoSection";
import { UpdateFormModel } from "../UpdateFormModel/UpdatePaymentRequisitionFormModel";
import UpdatePaymentRequisitionSection from "../UpdateFormSection";

import { PaymentRequisitionDetailViewModel, TransferType } from ".";

interface UpdateContentProps {
  "data-testid"?: string;

  viewModel: PaymentRequisitionDetailViewModel;
  summaryScreenPath: string;
  paymentMethodOptions: CommonOption[];

  onClickSubmitPaymentRequisition: (values: UpdateFormModel) => void;
  onClickSavePaymentRequisition: (values: UpdateFormModel) => void;
  onUploadUpdateForm: (values: UpdateFormModel, file: File) => void;
  onDownloadTemplateClick: (transferType: TransferType) => void;
}

/**
 * @empfPortal trustee
 * @empfScreenID B2, B3, B4, B5, B6, B13, B14, B15, B27, B28
 * @empfComponent
 * @empfDesc It is a screen component for "Payment Requisiton - Detail". It wraps section components.
 * @empfProp viewModel
 * @empfProp summaryScreenPath
 * @empfProp paymentMethodOptions
 * @empfProp onClickSubmitPaymentRequisition
 * @empfProp onClickSavePaymentRequisition
 * @empfProp onUploadUpdateForm
 * @empfProp onDownloadTemplateClick
 * @empfConnMap Transfer in from ORSO Schemes - Payment Requisition
 * @empfAction viewDetail - View payment requisition detail on page load
 * @empfActionDesc viewDetail - This API is for viewing payment requisition detail
 * @empfAction submit - Submit payment requisition by clicking confirm button in submit dialog
 * @empfActionDesc submit - This API is for submitting payment requisition.
 * @empfAction downloadTemplate - Download detail submission excel template by clicking download template button
 * @empfActionDesc downloadTemplate - This API is for getting the template for uploading data for payment requision.
 * @empfAction upload - Upload filled submission excel template and save the form by clicking upload button
 * @empfActionDesc upload - This API is for uploadding filled excel data and saving the form.
 * @empfAPI viewDetail - TRF-TR-TRFDATA-VIEW
 * @empfAPI submit - TRF-TR-TRFDATA-SAVE
 * @empfAPI downloadTemplate - TRF-TR-DOWNLOAD
 * @empfAPI upload - TRF-TR-TRFDATA-UPLOAD
 *
 * @empfPortal orso
 * @empfScreenID B2, B3, B4, B5, B6, B13, B14, B15, B27, B28
 * @empfComponent
 * @empfDesc It is a screen component for "Payment Requisiton - Detail". It wraps section components.
 * @empfProp viewModel
 * @empfProp summaryScreenPath
 * @empfProp paymentMethodOptions
 * @empfProp onClickSubmitPaymentRequisition
 * @empfProp onClickSavePaymentRequisition
 * @empfProp onUploadUpdateForm
 * @empfProp onDownloadTemplateClick
 * @empfConnMap Transfer in from ORSO Schemes - Payment Requisition
 * @empfAction submit - Submit payment requisition by clicking confirm button in submit dialog
 * @empfActionDesc submit - This API is for submitting payment requisition.
 * @empfAction downloadTemplate - Download detail submission excel template by clicking download template button
 * @empfActionDesc downloadTemplate - This API is for getting the template for uploading data for payment requision.
 * @empfAction upload - Upload filled submission excel template and save the form by clicking upload button
 * @empfActionDesc upload - This API is for uploadding filled excel data and saving the form.
 * @empfAPI viewDetail - ORSO-TRF-DATA-VIEW
 * @empfAPI submit - ORSO-TRF-DATA-SUBMISSION
 * @empfAPI downloadTemplate - ORSO-TRF-ENQ-DOWNLOAD
 * @empfAPI upload - ORSO-TRF-DATA-UPLOAD
 */
const UpdateContent = ({
  "data-testid": dataTestId,

  viewModel,
  summaryScreenPath,
  paymentMethodOptions,

  onClickSubmitPaymentRequisition,
  onClickSavePaymentRequisition,
  onUploadUpdateForm,
  onDownloadTemplateClick,
}: UpdateContentProps): ReactElement => {
  return (
    <div
      data-testid={dataTestId}
      className="mb-actionBar flex flex-col gap-section"
    >
      <TransferRequestInfoSection viewModel={viewModel.transferRequest} />
      <UpdatePaymentRequisitionSection
        viewModel={viewModel}
        onClickSubmitPaymentRequisition={onClickSubmitPaymentRequisition}
        onClickSavePaymentRequisition={onClickSavePaymentRequisition}
        onUploadUpdateForm={onUploadUpdateForm}
        onDownloadTemplateClick={onDownloadTemplateClick}
        summaryScreenPath={summaryScreenPath}
        paymentMethodOptions={paymentMethodOptions}
      />
    </div>
  );
};

export default UpdateContent;
