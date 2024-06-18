import { ReactElement } from "react";

import { CommonOption } from "../../../models/option";
import {
  PaymentRequisitionDetailViewModel,
  TransferType,
} from "../PaymentRequisitionContents";
import { UpdateFormModel } from "../UpdateFormModel/UpdatePaymentRequisitionFormModel";

import { UpdateMmbPaymentRequisitionForm } from "./UpdateMmbPaymentRequisitionForm";
import { UpdateSchemeOrIntraGroupPaymentRequisitionForm } from "./UpdateSchemeOrIntraGroupPaymentRequisitionForm";

interface UpdatePaymentRequisitionSectionProps {
  className?: string;
  viewModel: PaymentRequisitionDetailViewModel;
  summaryScreenPath: string;
  paymentMethodOptions: CommonOption[];

  onClickSubmitPaymentRequisition: (values: UpdateFormModel) => void;
  onClickSavePaymentRequisition: (values: UpdateFormModel) => void;
  onUploadUpdateForm: (values: UpdateFormModel, file: File) => void;
  onDownloadTemplateClick: (transferType: TransferType) => void;
}

const UpdatePaymentRequisitionSection = (
  props: UpdatePaymentRequisitionSectionProps
): ReactElement => {
  const {
    className,
    viewModel,
    summaryScreenPath,
    paymentMethodOptions,
    onClickSubmitPaymentRequisition,
    onClickSavePaymentRequisition,
    onUploadUpdateForm,
    onDownloadTemplateClick,
  } = props;

  return (
    <>
      {viewModel.transferType === "MmbTransfer" ? (
        <UpdateMmbPaymentRequisitionForm
          onSubmit={onClickSubmitPaymentRequisition}
          onSave={onClickSavePaymentRequisition}
          onUpload={onUploadUpdateForm}
          className={className}
          viewModel={viewModel}
          onDownloadTemplateClick={onDownloadTemplateClick}
          summaryScreenPath={summaryScreenPath}
          paymentMethodOptions={paymentMethodOptions}
        />
      ) : (
        <UpdateSchemeOrIntraGroupPaymentRequisitionForm
          onSubmit={onClickSubmitPaymentRequisition}
          onSave={onClickSavePaymentRequisition}
          onUpload={onUploadUpdateForm}
          className={className}
          viewModel={viewModel}
          onDownloadTemplateClick={onDownloadTemplateClick}
          summaryScreenPath={summaryScreenPath}
          paymentMethodOptions={paymentMethodOptions}
        />
      )}
    </>
  );
};

export default UpdatePaymentRequisitionSection;
