import { ReactElement, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import cn from "classnames";
import ActionBar, {
  ActionBarPrimaryButton,
  ActionBarSecondaryButton,
} from "frontend-common/src/components/ActionBar";

import PaymentDetailsSection from "../PaymentDetailsSection";
import TransferRequestInfoSection from "../TransferRequestInfoSection";
import TransferTypesSection from "../TransferTypesSection";
import TrusteeInputSection from "../TrusteeInputSection";

import {
  PaymentRequisitionDetailRole,
  PaymentRequisitionDetailViewModel,
} from ".";

interface PendingReplyContentProps {
  "data-testid"?: string;

  summaryScreenPath: string;
  viewModel: PaymentRequisitionDetailViewModel;

  onClickApprovePaymentRequisition: (caseId: string) => void;
  onClickRejectPaymentRequisition: (caseId: string) => void;

  role: PaymentRequisitionDetailRole;
}

/**
 * @empfPortal trustee
 * @empfScreenID  B8, B9, B10, B22, B24, B25
 * @empfComponent
 * @empfDesc It is a screen component for "Payment Requisiton - Detail". It wraps section components.
 * @empfProp summaryScreenPath
 * @empfProp viewModel
 * @empfProp onClickApprovePaymentRequisition
 * @empfProp onClickRejectPaymentRequisition
 * @empfProp role
 * @empfConnMap Transfer in from ORSO Schemes - Payment Requisition
 * @empfAction reject -  Reject payment requisition case by clicking confirm button in reject dialog
 * @empfActionDesc reject - This API is for rejecting payment requisition case.
 * @empfAction approve - Approve payment requisition case by clicking confirm button in approve dialog
 * @empfActionDesc approve - This API is for approving payment requisition case.
 * @empfAPI approve - TRPT-BE-TRF-A012
 * @empfAPI reject - TRPT-BE-TRF-A011
 *
 * @empfPortal orso
 * @empfScreenID  B8, B9, B10, B22, B24, B25
 * @empfComponent
 * @empfDesc It is a screen component for "Payment Requisiton - Detail". It wraps section components.
 * @empfProp summaryScreenPath
 * @empfProp viewModel
 * @empfProp onClickApprovePaymentRequisition
 * @empfProp onClickRejectPaymentRequisition
 * @empfProp role
 * @empfConnMap Transfer in from ORSO Schemes - Payment Requisition
 * @empfAction reject -  Reject payment requisition case by clicking confirm button in reject dialog
 * @empfActionDesc reject - This API is for rejecting payment requisition case.
 * @empfAction approve - Approve payment requisition case by clicking confirm button in approve dialog
 * @empfActionDesc approve - This API is for approving payment requisition case.
 * @empfAPI approve - ORSO-TRF-PYM-REQ-APPROVE
 * @empfAPI reject - ORSO-TRF-PYM-REQ-REJECT
 */
const PendingReplyContent = ({
  "data-testid": dataTestId,

  viewModel,
  onClickApprovePaymentRequisition,
  onClickRejectPaymentRequisition,
  role,
}: PendingReplyContentProps): ReactElement => {
  const { t } = useTranslation();
  const { id: caseId } = useParams();

  const handleClickApprove = useCallback(() => {
    onClickApprovePaymentRequisition(caseId ?? "");
  }, [caseId, onClickApprovePaymentRequisition]);
  const handleClickReject = useCallback(() => {
    onClickRejectPaymentRequisition(caseId ?? "");
  }, [caseId, onClickRejectPaymentRequisition]);
  return (
    <div
      data-testid={dataTestId}
      className={cn("flex flex-col gap-section", {
        "mb-actionBar": role === "Supervisor",
      })}
    >
      <TransferTypesSection transferType={viewModel.transferType} />
      <TransferRequestInfoSection viewModel={viewModel.transferRequest} />
      {viewModel.transferRequest.followUp ? (
        <TrusteeInputSection trusteeComment={viewModel.trusteeComment} />
      ) : null}
      <PaymentDetailsSection viewModel={viewModel} />
      <ActionBar className="fixed top-auto bottom-0 right-0 w-full">
        {role === "Supervisor" ? (
          <>
            <ActionBarSecondaryButton
              data-testid="FormRejectButton"
              type="button"
              onClick={handleClickReject}
            >
              {t("PaymentRequisitionDetailScreen.actionBar.action.reject")}
            </ActionBarSecondaryButton>
            <ActionBarPrimaryButton
              type="button"
              data-testid="FormApproveButton"
              onClick={handleClickApprove}
            >
              {t("PaymentRequisitionDetailScreen.actionBar.action.approve")}
            </ActionBarPrimaryButton>
          </>
        ) : null}
      </ActionBar>
    </div>
  );
};

export default PendingReplyContent;
