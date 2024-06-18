import { PaymentRequisitionDetailViewModel } from "../PaymentRequisitionContents";

import {
  mapViewModelToMmbBenefitsDetailsRows,
  mapViewModelToSchemeOrIntraGroupBenefitsDetailsRows,
} from "./mappers";
import {
  getIntraGroupUpdateFormInitialValues,
  getMmbUpdateFormInitialValues,
  getSchemeUpdateFormInitialValues,
  isFormModelIntraGroupTransfer,
  isFormModelMmbTransfer,
  isFormModelSchemeTransfer,
  UpdateIntraGroupPaymentRequisitionFormModel,
  UpdateMmbPaymentRequisitionFormModel,
  UpdateSchemePaymentRequisitionFormModel,
  UpdateSchemePaymentRequisitionFormSchema,
} from "./UpdatePaymentRequisitionFormModel";

describe("UpdatePaymentRequisitionFormModel", () => {
  const mockIntraGroupViewModel: PaymentRequisitionDetailViewModel = {
    transferType: "IntraGroupTransfer",
    memberList: [],
    transferRequest: {
      originalRequest: {
        trusteeName: "AIB Company (Trustee) Limited",
        schemeName: "BEA Bunda (MPF) Master Trust Schemes",
        employerName: "Personal Account (DUMMY)",
        employerAccountNumber: "91234567890",
      },
      newRequest: {
        trusteeName: "AIA Company (Trustee) Limited",
        schemeName: "AIA MPF - Prime Value Choice",
        employerName: "Personal Account (DUMMY)",
        employerAccountNumber: "91234567890",
      },
      transferType: "IntraGroupTransfer",
      employerTransferRefNo: "TF95026520230421033218",
      transferEffectiveDate: new Date("2022-08-14"),
      followUp: null,
    },
    paymentInfo: {
      billingRefNo: "billRefNo",
      bankName: "bankName",
      paymentMethod: { name: "payMethod", key: "payMethod" },
      bankAcctNo: "bankAccntNumber",
      chequeNo: "chequeNo",
      totalAmount: 100,
    },
    trusteeComment: "trusteeComment",
  };

  const mockSchemeViewModel: PaymentRequisitionDetailViewModel = {
    transferType: "SchemeTransfer",
    memberList: [],
    transferRequest: {
      originalRequest: {
        trusteeName: "AIB Company (Trustee) Limited",
        schemeName: "BEA Bunda (MPF) Master Trust Schemes",
        employerName: "Personal Account (DUMMY)",
        employerAccountNumber: "91234567890",
      },
      newRequest: {
        trusteeName: "AIA Company (Trustee) Limited",
        schemeName: "AIA MPF - Prime Value Choice",
        employerName: "Personal Account (DUMMY)",
        employerAccountNumber: "91234567890",
      },
      transferType: "SchemeTransfer",
      employerTransferRefNo: "TF95026520230421033218",
      transferEffectiveDate: new Date("2022-08-14"),
      followUp: null,
    },
    paymentInfo: {
      billingRefNo: "billRefNo",
      bankName: "bankName",
      paymentMethod: { name: "payMethod", key: "payMethod" },
      bankAcctNo: "bankAccntNumber",
      chequeNo: "chequeNo",
      totalAmount: 100,
    },
    trusteeComment: "trusteeComment",
  };

  const mockMmbViewModel: PaymentRequisitionDetailViewModel = {
    transferType: "MmbTransfer",
    memberList: [],
    transferRequest: {
      originalRequest: {
        trusteeName: "AIB Company (Trustee) Limited",
        schemeName: "BEA Bunda (MPF) Master Trust Schemes",
        employerName: "Personal Account (DUMMY)",
        employerAccountNumber: "91234567890",
      },
      newRequest: {
        trusteeName: "AIA Company (Trustee) Limited",
        schemeName: "AIA MPF - Prime Value Choice",
        employerName: "Personal Account (DUMMY)",
        employerAccountNumber: "91234567890",
      },
      transferType: "MmbTransfer",
      employerTransferRefNo: "TF95026520230421033218",
      transferEffectiveDate: new Date("2022-08-14"),
      followUp: null,
    },
    paymentInfo: {
      billingRefNo: "billRefNo",
      bankName: "bankName",
      paymentMethod: { name: "payMethod", key: "payMethod" },
      bankAcctNo: "bankAccntNumber",
      chequeNo: "chequeNo",
      totalAmount: 100,
    },
    trusteeComment: "trusteeComment",
  };

  it("getIntraGroupUpdateFormInitialValues", () => {
    expect(
      getIntraGroupUpdateFormInitialValues(mockIntraGroupViewModel)
    ).toEqual({
      transferType: "IntraGroupTransfer",
      billRefNo: "billRefNo",
      trusteeComment: "trusteeComment",
      paymentMethod: "payMethod",
      bankName: "bankName",
      bankAcctNo: "bankAccntNumber",
      chequeNo: "chequeNo",
      totalPaymentAmount: 100,
      benefitsDetails: mapViewModelToSchemeOrIntraGroupBenefitsDetailsRows(
        mockIntraGroupViewModel
      ),
    });
  });

  it("getSchemeUpdateFormInitialValues", () => {
    expect(getSchemeUpdateFormInitialValues(mockSchemeViewModel)).toEqual({
      transferType: "SchemeTransfer",
      billRefNo: "billRefNo",
      trusteeComment: "trusteeComment",
      paymentMethod: "payMethod",
      bankName: "bankName",
      bankAcctNo: "bankAccntNumber",
      chequeNo: "chequeNo",
      totalPaymentAmount: 100,
      benefitsDetails:
        mapViewModelToSchemeOrIntraGroupBenefitsDetailsRows(
          mockSchemeViewModel
        ),
    });
  });

  it("getMmbUpdateFormInitialValues", () => {
    expect(getMmbUpdateFormInitialValues(mockMmbViewModel)).toEqual({
      transferType: "MmbTransfer",
      billRefNo: "billRefNo",
      trusteeComment: "trusteeComment",
      paymentMethod: "payMethod",
      bankName: "bankName",
      bankAcctNo: "bankAccntNumber",
      chequeNo: "chequeNo",
      totalPaymentAmount: 100,
      benefitsDetails: mapViewModelToMmbBenefitsDetailsRows(mockMmbViewModel),
    });
  });

  const mockSchemeUpdateFormValues: UpdateSchemePaymentRequisitionFormModel = {
    transferType: "SchemeTransfer",
    billRefNo: "scheme bill ref no",
    trusteeComment: "scheme trustee comment",
    chequeNo: "scheme chequeNo",
    paymentMethod: "scheme payment method",
    bankName: "scheme bank name",
    bankAcctNo: "scheme bank acct number",
    totalPaymentAmount: 100,
    benefitsDetails: [
      {
        transferType: "SchemeTransfer",
        surnameZh: "mock surname zh",
        givenNameZh: "mock given name zh",
        surnameEn: "mock surname en",
        givenNameEn: "mock given name en",
        idType: "mock id type",
        idNo: "mock id number",
        newMemberFlg: true,
        eeMmb: 1,
        eeOrso: 2,
        eePostMpf: 3,
        eePreMpf: 4,
        erMmb: 5,
        erOrso: 6,
        erPostMpf: 7,
        erPreMpf: 8,
      },
    ],
  };

  const mockIntraGroupUpdateFormValues: UpdateIntraGroupPaymentRequisitionFormModel =
    {
      transferType: "IntraGroupTransfer",
      billRefNo: "intra group bill ref no",
      trusteeComment: "intra group trustee comment",
      chequeNo: "intra group chequeNo",
      paymentMethod: "intra group payment method",
      bankName: "intra group bank name",
      bankAcctNo: "intra group bank acct number",
      totalPaymentAmount: 100,
      benefitsDetails: [
        {
          transferType: "IntraGroupTransfer",
          surnameZh: "mock surname zh",
          givenNameZh: "mock given name zh",
          surnameEn: "mock surname en",
          givenNameEn: "mock given name en",
          idType: "mock id type",
          idNo: "mock id number",
          newMemberFlg: true,
          eeMmb: 1,
          eeOrso: 2,
          eePostMpf: 3,
          eePreMpf: 4,
          erMmb: 5,
          erOrso: 6,
          erPostMpf: 7,
          erPreMpf: 8,
        },
      ],
    };

  const mockMmbUpdateFormValues: UpdateMmbPaymentRequisitionFormModel = {
    transferType: "MmbTransfer",
    billRefNo: "mmb bill ref no",
    trusteeComment: "mmb trustee comment",
    chequeNo: "mmb chequeNo",
    paymentMethod: "mmb payment method",
    bankName: "mmb bank name",
    bankAcctNo: "mmb bank acct number",
    totalPaymentAmount: 100,
    benefitsDetails: [
      {
        transferType: "MmbTransfer",
        surnameZh: "mock surname zh",
        givenNameZh: "mock given name zh",
        surnameEn: "mock surname en",
        givenNameEn: "mock given name en",
        idType: "mock id type",
        idNo: "mock id number",
        mmbAmount: 300,
      },
    ],
  };

  it("isFormModelSchemeTransfer", () => {
    expect(isFormModelSchemeTransfer(mockSchemeUpdateFormValues)).toEqual(true);
    expect(isFormModelSchemeTransfer(mockIntraGroupUpdateFormValues)).toEqual(
      false
    );
    expect(isFormModelSchemeTransfer(mockMmbUpdateFormValues)).toEqual(false);
  });

  it("isFormModelIntraGroupTransfer", () => {
    expect(isFormModelIntraGroupTransfer(mockSchemeUpdateFormValues)).toEqual(
      false
    );
    expect(
      isFormModelIntraGroupTransfer(mockIntraGroupUpdateFormValues)
    ).toEqual(true);
    expect(isFormModelIntraGroupTransfer(mockMmbUpdateFormValues)).toEqual(
      false
    );
  });

  it("isFormModelSchemeTransfer", () => {
    expect(isFormModelMmbTransfer(mockSchemeUpdateFormValues)).toEqual(false);
    expect(isFormModelMmbTransfer(mockIntraGroupUpdateFormValues)).toEqual(
      false
    );
    expect(isFormModelMmbTransfer(mockMmbUpdateFormValues)).toEqual(true);
  });
});

describe("UpdateSchemePaymentRequisitionFormSchema", () => {
  test("validate", () => {
    UpdateSchemePaymentRequisitionFormSchema.validateSync({
      totalPaymentAmount: 0,
      bankAcctNo: "1234",
      bankName: "bank name",
      paymentMethod: "pay method",
    });
  });
});
