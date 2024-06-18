import React, { ReactElement } from "react";

import PaymentDetailsSection from "../PaymentDetailsSection";
import TransferRequestInfoSection from "../TransferRequestInfoSection";
import TrusteeInputSection from "../TrusteeInputSection";

import { PaymentRequisitionDetailViewModel } from ".";

interface ViewOnlyContentProps {
  "data-testid"?: string;
  summaryScreenPath: string;
  viewModel: PaymentRequisitionDetailViewModel;
}

/**
 * @empfPortal trustee
 * @empfScreenID B26
 * @empfComponent
 * @empfDesc It is a screen component for "Payment Requisiton - Detail". It wraps section components.
 * @empfProp summaryScreenPath
 * @empfProp viewModel
 * @empfConnMap Transfer in from ORSO Schemes - Payment Requisition
 *
 * @empfPortal orso
 * @empfScreenID B26
 * @empfComponent
 * @empfDesc It is a screen component for "Payment Requisiton - Detail". It wraps section components.
 * @empfProp summaryScreenPath
 * @empfProp viewModel
 * @empfConnMap Transfer in from ORSO Schemes - Payment Requisition
 */
const ViewOnlyContent = ({
  "data-testid": dataTestId,
  viewModel,
}: ViewOnlyContentProps): ReactElement => {
  return (
    <div data-testid={dataTestId} className="flex flex-col gap-section">
      <TransferRequestInfoSection viewModel={viewModel.transferRequest} />
      {viewModel.transferRequest.followUp ? (
        <TrusteeInputSection trusteeComment={viewModel.trusteeComment} />
      ) : null}
      <PaymentDetailsSection viewModel={viewModel} />
    </div>
  );
};

export default ViewOnlyContent;
