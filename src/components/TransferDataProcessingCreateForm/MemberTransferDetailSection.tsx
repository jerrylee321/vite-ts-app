import React, { ReactElement } from "react";
import { FormikProps } from "formik";
import Accordion from "frontend-common/src/components/Accordion";
import FormTable from "frontend-common/src/components/FormTable";

import MemberTransferDetailsTableHeader from "../TransferCaseDetail/MemberTransferDetailsTableHeader";

import {
  getIntraGroupTransferMemberColumns,
  getMmbTransferMemberColumns,
  getSchemeTransferMemberColumns,
} from "./getMemberTransferColumns";
import {
  getTransferCreateFormMemberIntraGroupTransferInitialValue,
  getTransferCreateFormMemberMmbTransferInitialValue,
  getTransferCreateFormMemberSchemeTransferInitialValue,
  TransferCreateFormIntraGroupTransferModel,
  TransferCreateFormMmbTransferModel,
  TransferCreateFormSchemeTransferModel,
} from "./TransferDataProcessingCreateFormModel";

interface MemberTransferDetailSectionProps {
  formikProps:
    | FormikProps<TransferCreateFormSchemeTransferModel>
    | FormikProps<TransferCreateFormIntraGroupTransferModel>
    | FormikProps<TransferCreateFormMmbTransferModel>;
  errorRowIndexes: Set<number>;
}

/**
 * @empfPortal trustee
 * @empfScreenID A2, A3, A4, A6, A9, A20, A21, A22, A23, A24, A25, A28, A29, A30
 * @empfComponent
 * @empfDesc It is a section component for member transfer details of "Transfer Data Processing - Create". It wraps the data table form components.
 * @empfProp formikProps
 * @empfProp errorRowIndexes
 * @empfConnMap Transfer in from ORSO Schemes - Transfer Data Processing
 *
 * @empfPortal orso
 * @empfScreenID A2, A3, A4, A6, A9, A20, A21, A22, A23, A24, A25, A28, A29, A30
 * @empfComponent
 * @empfDesc It is a section component for member transfer details of "Transfer Data Processing - Create". It wraps the data table form components.
 * @empfProp formikProps
 * @empfProp errorRowIndexes
 * @empfConnMap Transfer in from ORSO Schemes - Transfer Data Processing
 */
const MemberTransferDetailSection = (
  props: MemberTransferDetailSectionProps
): ReactElement => {
  const { formikProps, errorRowIndexes } = props;
  const { values } = formikProps;

  return (
    <Accordion>
      <MemberTransferDetailsTableHeader
        className="mt-4 "
        memberCount={values.memberList.length}
      />
      {values.transferType === "MMB_SCHEME_TRAN" ? (
        <FormTable
          pinnedRowIds={errorRowIndexes}
          name="memberList"
          columnsGetter={getSchemeTransferMemberColumns}
          newItemValue={getTransferCreateFormMemberSchemeTransferInitialValue}
          data={values.memberList}
          isDeleteEnabled={true}
          isAddItemEnabled={true}
        />
      ) : null}
      {values.transferType === "MMB_INTRA_GROUP" ? (
        <FormTable
          pinnedRowIds={errorRowIndexes}
          name="memberList"
          columnsGetter={getIntraGroupTransferMemberColumns}
          newItemValue={
            getTransferCreateFormMemberIntraGroupTransferInitialValue
          }
          data={values.memberList}
          isDeleteEnabled={true}
          isAddItemEnabled={true}
        />
      ) : null}
      {values.transferType === "MMB" ? (
        <FormTable
          pinnedRowIds={errorRowIndexes}
          name="memberList"
          columnsGetter={getMmbTransferMemberColumns}
          newItemValue={getTransferCreateFormMemberMmbTransferInitialValue}
          data={values.memberList}
          isDeleteEnabled={true}
          isAddItemEnabled={true}
        />
      ) : null}
    </Accordion>
  );
};

export default MemberTransferDetailSection;
