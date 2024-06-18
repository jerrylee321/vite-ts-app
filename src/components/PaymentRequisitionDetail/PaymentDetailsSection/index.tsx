import { ReactElement } from "react";
import { useTranslation } from "react-i18next";

import Accordion from "../../Accordion";
import DataTable from "../../DataTable";
import BenefitDetailsTableHeader from "../BenefitsDetailsTable/BenefitDetailsTableHeader";
import {
  MmbTransferBenefitsDetailsColumns,
  SchemeOrIntraGroupTransferBenefitsDetailsColumns,
} from "../BenefitsDetailsTable/ReadOnlyBenefitsDetailsColumns";
import { PaymentRequisitionDetailViewModel } from "../PaymentRequisitionContents";

import PaymentInfoContent from "./PaymentInfoContent";

interface PaymentDetailsSectionProps {
  viewModel: PaymentRequisitionDetailViewModel;
}

const PaymentDetailsSection = ({
  viewModel,
}: PaymentDetailsSectionProps): ReactElement => {
  const { transferType, memberList, paymentInfo } = viewModel;
  const { t } = useTranslation();

  return (
    <Accordion
      className="bg-white"
      title={t("PaymentRequisitionDetailScreen.PaymentDetails.title")}
    >
      <PaymentInfoContent paymentInfo={paymentInfo} />

      {transferType === "MmbTransfer" ? (
        <DataTable
          columns={MmbTransferBenefitsDetailsColumns}
          data={memberList}
          isExportEnabled={false}
          isQuickSearchEnabled={false}
          isSelectEnabled={false}
          data-testid="MmbTransferTable"
          header={
            <BenefitDetailsTableHeader
              memberCount={memberList.length}
              className="mt-8 mb-2"
            />
          }
        />
      ) : (
        // Scheme and IntraGroup Transfers use the same benefits details model
        <DataTable
          columns={SchemeOrIntraGroupTransferBenefitsDetailsColumns}
          data={memberList}
          isExportEnabled={false}
          isQuickSearchEnabled={false}
          isSelectEnabled={false}
          data-testid="SchemeOrIntraGroupTransferTable"
          header={
            <BenefitDetailsTableHeader
              memberCount={memberList.length}
              className="mt-8 mb-2"
            />
          }
        />
      )}
    </Accordion>
  );
};

export default PaymentDetailsSection;
