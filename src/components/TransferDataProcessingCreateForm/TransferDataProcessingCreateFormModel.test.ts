import {
  TransferCreateFormBaseModel,
  transferCreateFormIntraGroupTransferInitialValue,
  TransferCreateFormIntraGroupTransferModel,
  TransferCreateFormIntraGroupTransferSchema,
  TransferCreateFormMemberBaseModel,
  TransferCreateFormMmbTransferModel,
  TransferCreateFormMmbTransferSchema,
  transferCreateFormSchemeTransferInitialValue,
  TransferCreateFormSchemeTransferModel,
  TransferCreateFormSchemeTransferSchema,
} from "./TransferDataProcessingCreateFormModel";

describe("TransferDataProcessingCreateFormModel", () => {
  test("Check if schema validates correctly", () => {
    // Initial value missing required field
    expect(
      TransferCreateFormSchemeTransferSchema.isValidSync(
        transferCreateFormSchemeTransferInitialValue
      )
    ).toEqual(false);

    expect(
      TransferCreateFormIntraGroupTransferSchema.isValidSync(
        transferCreateFormIntraGroupTransferInitialValue
      )
    ).toEqual(false);

    expect(
      TransferCreateFormSchemeTransferSchema.isValidSync(
        transferCreateFormSchemeTransferInitialValue
      )
    ).toEqual(false);

    const mockBaseMember: TransferCreateFormMemberBaseModel = {
      rowId: 0,
      orsoAccountNumber: "mock orsoAccountNumber",
      mpfAccountNumber: "mock mpfAccountNumber",
      surnameZh: "mock surnameZh",
      surnameEn: "mock surnameEn",
      givenNameZh: "mock givenNameZh",
      givenNameEn: "mock givenNameEn",
      memberIdType: "HKID",
      memberIdNumber: "mock memberIdNumber",
    };

    const mockBaseFormData: TransferCreateFormBaseModel = {
      orsoTrusteeId: "mock orsoTrusteeId",
      orsoSchemeName: "mock orsoSchemeName",
      orsoTrusteeRegistrationNumber: "mock orsoRegistrationNumber",
      orsoOrsoEmployerName: "mock orsoOrsoEmployerName",
      orsoOrsoEmployerAccountNumber: "mock orsoOrsoEmployerAccountNumber",
      orsoTrusteeAddress: {
        country: "mock country",
        city: "mock city",
        room: "mock room",
        floor: "mock floor",
        block: "mock block",
        building: "mock building",
        street: "mock street",
        district: "mock district",
        postalCode: "mock postalCode",
      },
      mpfTrusteeName: "mock mpfTrusteeName",
      mpfSchemeUuid: "mock mpfSchemeUuid",
    };

    const mockSchemeTransferFormData: TransferCreateFormSchemeTransferModel = {
      ...mockBaseFormData,
      transferType: "MMB_SCHEME_TRAN",
      orsoTrusteeEffectiveDateOfTransfer: new Date("2023-04-27"),
      mpfMpfEmployerName: "mock mpfMpfEmployerName",
      mpfMpfEmployerAccountNumber: "mock mpfMpfEmployerAccountNumber",
      mpfPayrollGroupCode: "mock mpfPayrollGroupCode",
      memberList: [
        {
          ...mockBaseMember,
          isNewMember: true,
          orsoSchemeJoinDate: new Date("2023-04-26"),
        },
      ],
    };

    const mockIntraGroupTransferFormData: TransferCreateFormIntraGroupTransferModel =
      {
        ...mockBaseFormData,
        transferType: "MMB_INTRA_GROUP",
        orsoTrusteeEffectiveDateOfTransfer: new Date("2023-04-27"),
        mpfMpfEmployerName: "mock mpfMpfEmployerName",
        mpfMpfEmployerAccountNumber: "mock mpfMpfEmployerAccountNumber",
        mpfPayrollGroupCode: "mock mpfPayrollGroupCode",
        memberList: [
          {
            ...mockBaseMember,
            isNewMember: true,
            orsoSchemeJoinDate: new Date("2023-04-26"),
            existingEmployerEmploymentDate: new Date("2023-04-25"),
          },
        ],
      };

    const mockMmbTransferFormData: TransferCreateFormMmbTransferModel = {
      ...mockBaseFormData,
      transferType: "MMB",
      memberList: [
        {
          ...mockBaseMember,
        },
      ],
    };

    expect(
      TransferCreateFormSchemeTransferSchema.isValidSync(
        mockSchemeTransferFormData
      )
    ).toEqual(true);

    expect(
      TransferCreateFormIntraGroupTransferSchema.isValidSync(
        mockIntraGroupTransferFormData
      )
    ).toEqual(true);

    expect(
      TransferCreateFormMmbTransferSchema.isValidSync(mockMmbTransferFormData)
    ).toEqual(true);
  });
});
