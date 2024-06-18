import { Column } from "react-table";
import dateTimeSorting from "frontend-common/src/react-table/dateTimeSorting";

import { TransferCaseMember, TransferType } from "./models";

const getMemberTransferDetailsColumns = (
  transferType: TransferType
): Column<TransferCaseMember>[] => {
  return [
    {
      i18nKey:
        "TransferCaseDetail.memberTransferDetailsTable.header.memberOrsoAccountNumber",
      accessor: "orsoAcctNo",
    },
    ...(transferType === "MMB_SCHEME_TRAN" || transferType === "MMB_INTRA_GROUP"
      ? ([
          {
            i18nKey:
              "TransferCaseDetail.memberTransferDetailsTable.header.joinOrsoSchemeDate",
            accessor: "orsoJoinDt",
            dateFormat: "dd/MM/yyyy",
            sortType: dateTimeSorting,
          },
          {
            i18nKey:
              "TransferCaseDetail.memberTransferDetailsTable.header.memberType",
            id: "memberType",
            accessor: (data) => (data.newMemberFlg ? "New" : "Existing"),
          },
        ] as Column<TransferCaseMember>[])
      : []),
    {
      i18nKey:
        "TransferCaseDetail.memberTransferDetailsTable.header.memberMpfAccountNumber",
      accessor: "mpfAcctNo",
    },
    {
      i18nKey:
        "TransferCaseDetail.memberTransferDetailsTable.header.surnameChinese",
      id: "surnameChinese",
      accessor: "lastNameCn",
    },
    {
      i18nKey:
        "TransferCaseDetail.memberTransferDetailsTable.header.givenNameChinese",
      id: "givenNameChinese",
      accessor: "firstNameCn",
    },
    {
      i18nKey:
        "TransferCaseDetail.memberTransferDetailsTable.header.surnameEnglish",
      id: "surnameEnglish",
      accessor: "lastName",
    },
    {
      i18nKey:
        "TransferCaseDetail.memberTransferDetailsTable.header.givenNameEnglish",
      id: "givenNameEnglish",
      accessor: "firstName",
    },
    {
      i18nKey:
        "TransferCaseDetail.memberTransferDetailsTable.header.memberIdType",
      accessor: "idType",
    },
    {
      i18nKey:
        "TransferCaseDetail.memberTransferDetailsTable.header.memberIdNumber",
      accessor: "idNo",
    },
    ...(transferType === "MMB_INTRA_GROUP"
      ? ([
          {
            i18nKey:
              "TransferCaseDetail.memberTransferDetailsTable.header.dateOfEmployment",
            accessor: "existingErEmpDt",
            dateFormat: "dd/MM/yyyy",
            sortType: dateTimeSorting,
          },
        ] as Column<TransferCaseMember>[])
      : []),
  ];
};

export default getMemberTransferDetailsColumns;
