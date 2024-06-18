import { ReactElement, ReactNode, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate } from "react-router-dom";

import { RejectType } from "../../../apis/models/RejectOptions";
import { useSubmissionStateReturns } from "../../../hooks/useFormSubmissionState";
import { CommonOption } from "../../../models/option";
import ActionConfirmationDialogFlow, {
  DialogContent,
} from "../../ActionConfirmationDialogFlow";
import ApproveConfirmationDialogFlow from "../../ApproveConfirmationDialogFlow";
import RejectConfirmationDialogFlow from "../../RejectConfirmationDialogFlow";
import {
  IntraGroupTransferBenefitsDetailsViewModel,
  MmbTransferBenefitsDetailsViewModel,
  SchemeTransferBenefitsDetailsViewModel,
} from "../BenefitsDetailsTable/ReadOnlyBenefitsDetailsColumns";
import { PaymentInfoViewModel } from "../PaymentDetailsSection/PaymentInfoContent";
import { TransferRequestInfoSectionViewModel } from "../TransferRequestInfoSection";
import { UpdateFormModel } from "../UpdateFormModel/UpdatePaymentRequisitionFormModel";

import PendingReplyContent from "./PendingReplyContent";
import UpdateContent from "./UpdateContent";
import ViewOnlyContent from "./ViewOnlyContent";

// TODO: May need to refine the status when move to the ORSO portal
export type Status =
  | "Pending for Payment"
  | "Pending Virus Scan"
  | "Pending"
  | "Rejected"
  | "Saved"
  | "Processing"
  | "Follow Up"
  | "Pending follow up"
  | "Completed"
  | "Unknown";

export type TransferType =
  | "SchemeTransfer"
  | "IntraGroupTransfer"
  | "MmbTransfer"
  | "Unknown";

export interface CommonTransferViewModel {
  transferType: TransferType;
  transferRequest: TransferRequestInfoSectionViewModel;
  paymentInfo: PaymentInfoViewModel;
  trusteeComment: string | null;
}

export interface MmbTransferViewModel extends CommonTransferViewModel {
  transferType: Extract<TransferType, "MmbTransfer">;
  memberList: MmbTransferBenefitsDetailsViewModel[];
}

export interface SchemeTransferViewModel extends CommonTransferViewModel {
  transferType: Extract<TransferType, "SchemeTransfer">;
  memberList: SchemeTransferBenefitsDetailsViewModel[];
}

export interface IntraGroupTransferViewModel extends CommonTransferViewModel {
  transferType: Extract<TransferType, "IntraGroupTransfer">;
  memberList: IntraGroupTransferBenefitsDetailsViewModel[];
}

export type PaymentRequisitionDetailViewModel =
  | SchemeTransferViewModel
  | MmbTransferViewModel
  | IntraGroupTransferViewModel;

export type PaymentRequisitionDetailRole = "Preparer" | "Supervisor";

interface PaymentRequisitionDetailContentProps {
  viewModel: PaymentRequisitionDetailViewModel;
  status: Status;
  role: PaymentRequisitionDetailRole;
  summaryScreenPath: string;

  paymentMethodOptions: CommonOption[];
  submitSubmissionStateReturns: useSubmissionStateReturns<any, any>;
  saveSubmissionStateReturns: useSubmissionStateReturns<any, any>;
  onClickSubmitPaymentRequisition: (values: UpdateFormModel) => void;
  onClickSavePaymentRequisition: (values: UpdateFormModel) => void;
  onConfirmSubmitPaymentRequisition: () => void;
  onConfirmSavePaymentRequisition: () => void;

  onUploadPaymenRequisition: (values: UpdateFormModel, file: File) => void;
  onDownloadTemplateClick: (transferType: TransferType) => void;

  approveSubmissionStateReturns: useSubmissionStateReturns<any, any>;
  rejectSubmissionStateReturns: useSubmissionStateReturns<any, any>;
  onClickApprovePaymentRequisition: (caseId: string) => void;
  onClickRejectPaymentRequisition: (caseId: string) => void;
  onConfirmApprovePaymentRequisition: () => void;
  onConfirmRejectPaymentRequisition: () => void;
}

const PaymentRequisitionDetailContent = ({
  viewModel,
  status,
  role,
  summaryScreenPath,

  paymentMethodOptions,
  submitSubmissionStateReturns,
  saveSubmissionStateReturns,
  onClickSubmitPaymentRequisition,
  onClickSavePaymentRequisition,
  onConfirmSubmitPaymentRequisition,
  onConfirmSavePaymentRequisition,

  onUploadPaymenRequisition,
  onDownloadTemplateClick,

  approveSubmissionStateReturns,
  rejectSubmissionStateReturns,
  onClickApprovePaymentRequisition,
  onClickRejectPaymentRequisition,
  onConfirmApprovePaymentRequisition,
  onConfirmRejectPaymentRequisition,
}: PaymentRequisitionDetailContentProps): ReactElement => {
  const { t } = useTranslation();

  const renderViewOnlyContent = useCallback(
    () => (
      <ViewOnlyContent
        data-testid="viewOnlyContent"
        viewModel={viewModel}
        summaryScreenPath={summaryScreenPath}
      />
    ),
    [summaryScreenPath, viewModel]
  );

  const renderPendingFollowUpReplyContent = useCallback(
    () => (
      <PendingReplyContent
        data-testid="pendingReplyContent"
        viewModel={viewModel}
        onClickApprovePaymentRequisition={onClickApprovePaymentRequisition}
        onClickRejectPaymentRequisition={onClickRejectPaymentRequisition}
        role={role}
        summaryScreenPath={summaryScreenPath}
      />
    ),
    [
      onClickApprovePaymentRequisition,
      onClickRejectPaymentRequisition,
      role,
      summaryScreenPath,
      viewModel,
    ]
  );

  const renderRedirect = useCallback(
    () => <Navigate to={summaryScreenPath} />,
    [summaryScreenPath]
  );

  const navigate = useNavigate();
  const onCompleteSubmitOrSave = useCallback(() => {
    navigate(summaryScreenPath);
  }, [navigate, summaryScreenPath]);

  const renderUpdateContent = useCallback(
    () => (
      <UpdateContent
        data-testid="updateContent"
        viewModel={viewModel}
        paymentMethodOptions={paymentMethodOptions}
        onClickSubmitPaymentRequisition={onClickSubmitPaymentRequisition}
        onClickSavePaymentRequisition={onClickSavePaymentRequisition}
        onUploadUpdateForm={onUploadPaymenRequisition}
        onDownloadTemplateClick={onDownloadTemplateClick}
        summaryScreenPath={summaryScreenPath}
      />
    ),
    [
      onClickSavePaymentRequisition,
      onClickSubmitPaymentRequisition,
      onDownloadTemplateClick,
      onUploadPaymenRequisition,
      paymentMethodOptions,
      summaryScreenPath,
      viewModel,
    ]
  );

  const renderEmptyContent = useCallback(() => <></>, []);

  const Contents = useMemo((): Record<
    Status,
    Record<PaymentRequisitionDetailRole, () => ReactNode>
  > => {
    return {
      "Pending for Payment": {
        Preparer: renderUpdateContent,
        Supervisor: renderRedirect,
      },
      Saved: { Preparer: renderUpdateContent, Supervisor: renderRedirect },

      "Pending Virus Scan": {
        Preparer: renderRedirect,
        Supervisor: renderRedirect,
      },
      Pending: {
        Preparer: renderPendingFollowUpReplyContent,
        Supervisor: renderPendingFollowUpReplyContent,
      },
      "Pending follow up": {
        Preparer: renderPendingFollowUpReplyContent,
        Supervisor: renderPendingFollowUpReplyContent,
      },

      "Follow Up": {
        Preparer: renderUpdateContent,
        Supervisor: renderRedirect,
      },

      Processing: {
        Preparer: renderViewOnlyContent,
        Supervisor: renderViewOnlyContent,
      },

      Rejected: {
        Preparer: renderUpdateContent,
        Supervisor: renderRedirect,
      },
      Completed: {
        Preparer: renderViewOnlyContent,
        Supervisor: renderViewOnlyContent,
      },

      Unknown: {
        Preparer: renderEmptyContent,
        Supervisor: renderEmptyContent,
      },
    };
  }, [
    renderPendingFollowUpReplyContent,
    renderRedirect,
    renderUpdateContent,
    renderViewOnlyContent,
    renderEmptyContent,
  ]);

  const submitConfirmationDialogContent = useMemo<DialogContent>(() => {
    return {
      title: t("PaymentRequisitionDetailScreen.submit.confirmDialog.title"),
      primaryButtonLabel: t(
        "PaymentRequisitionDetailScreen.submit.confirmDialog.action.submit"
      ),
      secondaryButtonLabel: t(
        "PaymentRequisitionDetailScreen.submit.confirmDialog.action.back"
      ),
    };
  }, [t]);

  const submitSubmittedDialogContent = useMemo<DialogContent>(() => {
    return {
      title: t("PaymentRequisitionDetailScreen.submit.submittedDialog.title"),
      primaryButtonLabel: t(
        "PaymentRequisitionDetailScreen.submit.submittedDialog.action.ok"
      ),
    };
  }, [t]);

  const saveConfirmationDialogContent = useMemo<DialogContent>(() => {
    return {
      title: t("PaymentRequisitionDetailScreen.save.confirmDialog.title"),
      primaryButtonLabel: t(
        "PaymentRequisitionDetailScreen.save.confirmDialog.action.save"
      ),
      secondaryButtonLabel: t(
        "PaymentRequisitionDetailScreen.save.confirmDialog.action.back"
      ),
    };
  }, [t]);

  const saveSubmittedDialogContent = useMemo<DialogContent>(() => {
    return {
      title: t("PaymentRequisitionDetailScreen.save.submittedDialog.title"),
      primaryButtonLabel: t(
        "PaymentRequisitionDetailScreen.save.submittedDialog.action.ok"
      ),
    };
  }, [t]);

  return (
    <div data-testid="PaymentRequisitionContents">
      {Contents[status][role]()}

      <ApproveConfirmationDialogFlow
        {...approveSubmissionStateReturns}
        onConfirmApprove={onConfirmApprovePaymentRequisition}
      />
      <RejectConfirmationDialogFlow
        {...rejectSubmissionStateReturns}
        onConfirmReject={onConfirmRejectPaymentRequisition}
        rejectTypes={[RejectType.redo]}
      />

      <ActionConfirmationDialogFlow
        {...submitSubmissionStateReturns}
        confirmationDialogContent={submitConfirmationDialogContent}
        submittedDialogContent={submitSubmittedDialogContent}
        onConfirm={onConfirmSubmitPaymentRequisition}
        onComplete={onCompleteSubmitOrSave}
      />
      <ActionConfirmationDialogFlow
        {...saveSubmissionStateReturns}
        confirmationDialogContent={saveConfirmationDialogContent}
        submittedDialogContent={saveSubmittedDialogContent}
        onConfirm={onConfirmSavePaymentRequisition}
        onComplete={onCompleteSubmitOrSave}
      />
    </div>
  );
};

export default PaymentRequisitionDetailContent;
