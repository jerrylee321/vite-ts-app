import React, { ReactElement, useMemo } from "react";
import Accordion from "frontend-common/src/components/Accordion";
import DataTable from "frontend-common/src/components/DataTable";

import getMemberTransferDetailsColumns from "./MemberTransferDetailsColumns";
import MemberTransferDetailsTableHeader from "./MemberTransferDetailsTableHeader";
import { TransferCaseMember, TransferType } from "./models";

interface MemberTransferDetailsSectionProps {
  transferType: TransferType;
  members: TransferCaseMember[];
  totalCount: number;
}

/**
 * @empfPortal trustee
 * @empfScreenID A13, A18, A19, A31, A32, A33, A34, A35, A36, C2, C3, C4
 * @empfComponent
 * @empfDesc It is a section component for member transfer details of "Transfer Data Processing - Detail". It wraps the data table components.
 * @empfProp transferType
 * @empfProp members
 * @empfProp totalCount
 * @empfConnMap Transfer in from ORSO Schemes - ORSO Transfer in Enquiry
 *
 * @empfPortal orso
 * @empfScreenID A13, A18, A19, A31, A32, A33, A34, A35, A36, C2, C3, C4
 * @empfComponent
 * @empfDesc It is a section component for member transfer details of "Transfer Data Processing - Detail". It wraps the data table components.
 * @empfProp transferType
 * @empfProp members
 * @empfProp totalCount
 * @empfConnMap Transfer in from ORSO Schemes - ORSO Transfer in Enquiry
 */
const MemberTransferDetailsSection = (
  props: MemberTransferDetailsSectionProps
): ReactElement => {
  const { transferType, members, totalCount } = props;

  const columns = useMemo(
    () => getMemberTransferDetailsColumns(transferType),
    [transferType]
  );

  return (
    <Accordion className="pb-8">
      <MemberTransferDetailsTableHeader
        memberCount={totalCount}
        className="mt-4 "
      />
      <DataTable
        data-testid="MemberTransferDetailsDataTable"
        columns={columns}
        data={members}
        reactKeyFieldName="rowId"
      />
    </Accordion>
  );
};

export default MemberTransferDetailsSection;
