import React from "react";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik, FormikProps } from "formik";
import { fillMockDatePicker } from "frontend-common/__mocks__/formDatePicker";

import { CommonOption } from "../../models/option";
import { OrsoTrusteeItem } from "../../models/orsoTrusteeItem";
import { renderWithProviders } from "../../utils/test/render";
import { advanceTimers, selectMuiOption } from "../../utils/test/userEvent";

import {
  TransferCreateFormBaseModel,
  transferCreateFormIntraGroupTransferInitialValue,
  TransferCreateFormIntraGroupTransferModel,
  TransferCreateFormIntraGroupTransferSchema,
  TransferCreateFormMemberBaseModel,
  transferCreateFormMmbTransferInitialValue,
  TransferCreateFormMmbTransferModel,
  TransferCreateFormMmbTransferSchema,
  transferCreateFormSchemeTransferInitialValue,
  TransferCreateFormSchemeTransferModel,
  TransferCreateFormSchemeTransferSchema,
  TransferSchemeOption,
  TransferTrusteeOption,
  TrusteeAddress,
} from "./TransferDataProcessingCreateFormModel";
import TransferDataProcessingCreateForm from ".";

const mockTrusteeOptions: TransferTrusteeOption[] = [
  {
    name: "mock scheme",
    value: "__MOCK_trustee__",
  },
];
const mockSchemeOptions: TransferSchemeOption[] = [
  {
    uuid: "__MOCK_scheme__",
    name: "mock scheme",
    trusteeId: "__MOCK_trustee__",
  },
];
const mockCountryOptions: CommonOption[] = [
  {
    key: "mockCountryKey",
    name: "mockCountryName",
  },
];

const mockDistrictOptions: CommonOption[] = [
  {
    key: "mockDistrictKey",
    name: "mockDistrictName",
  },
];
const mockTrusteeAddress: Required<TrusteeAddress> = {
  country: "mockCountryKey",
  city: "mock city",
  room: "mock room",
  floor: "mock floor",
  block: "mock block",
  building: "mock building",
  street: "mock street",
  district: "mockDistrictKey",
  postalCode: "mock postalCode",
};

const mockOrsoTrusteeList: OrsoTrusteeItem[] = [
  {
    orsoTrusteeId: "__MOCK_trustee__",
    orsoTrusteeName: "mock scheme",
  },
];

async function fillInAddressField(user: ReturnType<typeof userEvent.setup>) {
  const countryInput = screen
    .getByTestId("orsoTrusteeAddress.country")
    .querySelector("input")!;
  const cityInput = screen
    .getByTestId("orsoTrusteeAddress.city")
    .querySelector("input")!;
  const roomInput = screen
    .getByTestId("orsoTrusteeAddress.room")
    .querySelector("input")!;
  const floorInput = screen
    .getByTestId("orsoTrusteeAddress.floor")
    .querySelector("input")!;
  const blockInput = screen
    .getByTestId("orsoTrusteeAddress.block")
    .querySelector("input")!;
  const buildingInput = screen
    .getByTestId("orsoTrusteeAddress.building")
    .querySelector("input")!;
  const streetInput = screen
    .getByTestId("orsoTrusteeAddress.street")
    .querySelector("input")!;
  const districtInput = screen
    .getByTestId("orsoTrusteeAddress.district")
    .querySelector("input")!;
  const postalCodeInput = screen
    .getByTestId("orsoTrusteeAddress.postalCode")
    .querySelector("input")!;

  expect(countryInput).toBeInTheDocument();
  expect(cityInput).toBeInTheDocument();
  expect(roomInput).toBeInTheDocument();
  expect(floorInput).toBeInTheDocument();
  expect(blockInput).toBeInTheDocument();
  expect(buildingInput).toBeInTheDocument();
  expect(streetInput).toBeInTheDocument();
  expect(districtInput).toBeInTheDocument();
  expect(postalCodeInput).toBeInTheDocument();

  countryInput.focus();
  await user.paste(mockTrusteeAddress.country);
  cityInput.focus();
  await user.paste(mockTrusteeAddress.city);
  roomInput.focus();
  await user.paste(mockTrusteeAddress.room);
  floorInput.focus();
  await user.paste(mockTrusteeAddress.floor);
  blockInput.focus();
  await user.paste(mockTrusteeAddress.block);
  buildingInput.focus();
  await user.paste(mockTrusteeAddress.building);
  streetInput.focus();
  await user.paste(mockTrusteeAddress.street);
  districtInput.focus();
  await user.paste(mockTrusteeAddress.district);
  postalCodeInput.focus();
  await user.paste(mockTrusteeAddress.postalCode);
}

const formTableName = "memberList";

async function fillInBaseMemberField(
  user: ReturnType<typeof userEvent.setup>,
  mockMember: TransferCreateFormMemberBaseModel
) {
  const orsoAccountNumberInput = screen
    .getByTestId(`${formTableName}[0].orsoAccountNumber`)
    .querySelector("input")!;
  const mpfAccountNumberInput = screen
    .getByTestId(`${formTableName}[0].mpfAccountNumber`)
    .querySelector("input")!;
  const surnameZhInput = screen
    .getByTestId(`${formTableName}[0].surnameZh`)
    .querySelector("input")!;
  const givenNameZhInput = screen
    .getByTestId(`${formTableName}[0].givenNameZh`)
    .querySelector("input")!;
  const surnameEnInput = screen
    .getByTestId(`${formTableName}[0].surnameEn`)
    .querySelector("input")!;
  const givenNameEnInput = screen
    .getByTestId(`${formTableName}[0].givenNameEn`)
    .querySelector("input")!;
  const memberIdTypeInput = screen.getByTestId(
    `${formTableName}[0].memberIdType`
  );

  const memberIdNumberInput = screen
    .getByTestId(`${formTableName}[0].memberIdNumber`)
    .querySelector("input")!;

  expect(orsoAccountNumberInput).toBeInTheDocument();
  expect(mpfAccountNumberInput).toBeInTheDocument();
  expect(surnameZhInput).toBeInTheDocument();
  expect(givenNameZhInput).toBeInTheDocument();
  expect(surnameEnInput).toBeInTheDocument();
  expect(givenNameEnInput).toBeInTheDocument();
  expect(memberIdTypeInput).toBeInTheDocument();
  expect(memberIdNumberInput).toBeInTheDocument();

  orsoAccountNumberInput.focus();
  await user.paste(mockMember.orsoAccountNumber ?? "");
  mpfAccountNumberInput.focus();
  await user.paste(mockMember.mpfAccountNumber ?? "");
  surnameZhInput.focus();
  await user.paste(mockMember.surnameZh);
  givenNameZhInput.focus();
  await user.paste(mockMember.givenNameZh);
  surnameEnInput.focus();
  await user.paste(mockMember.surnameEn);
  givenNameEnInput.focus();
  await user.paste(mockMember.givenNameEn);

  await selectMuiOption(
    user,
    `${formTableName}[0].memberIdType`,
    mockMember.memberIdType
  );

  memberIdNumberInput.focus();
  await user.paste(mockMember.memberIdNumber);
}

async function fillBaseFormField(
  user: ReturnType<typeof userEvent.setup>,
  mockBaseFormData: TransferCreateFormBaseModel
) {
  const orsoTrusteeIdInput = screen.getByTestId("orsoTrusteeId");

  const orsoSchemeNameInput = screen
    .getByTestId("orsoSchemeName")
    .querySelector("input")!;
  const orsoTrusteeRegistrationNumberInput = screen
    .getByTestId("orsoTrusteeRegistrationNumber")
    .querySelector("input")!;
  const orsoOrsoEmployerNameInput = screen
    .getByTestId("orsoOrsoEmployerName")
    .querySelector("input")!;
  const orsoOrsoEmployerAccountNumberInput = screen
    .getByTestId("orsoOrsoEmployerAccountNumber")
    .querySelector("input")!;

  expect(orsoTrusteeIdInput).toBeInTheDocument();
  expect(orsoSchemeNameInput).toBeInTheDocument();
  expect(orsoTrusteeRegistrationNumberInput).toBeInTheDocument();
  expect(orsoOrsoEmployerNameInput).toBeInTheDocument();
  expect(orsoOrsoEmployerAccountNumberInput).toBeInTheDocument();

  await selectMuiOption(user, "orsoTrusteeId", mockBaseFormData.orsoTrusteeId);

  orsoSchemeNameInput.focus();
  await user.paste(mockBaseFormData.orsoSchemeName);

  orsoTrusteeRegistrationNumberInput.focus();
  await user.paste(mockBaseFormData.orsoTrusteeRegistrationNumber);

  orsoOrsoEmployerNameInput.focus();
  await user.paste(mockBaseFormData.orsoOrsoEmployerName);

  orsoOrsoEmployerAccountNumberInput.focus();
  await user.paste(mockBaseFormData.orsoOrsoEmployerAccountNumber);

  await fillInAddressField(user);

  const mpfTrusteeNameInput = screen.getByTestId("mpfTrusteeName");
  const mpfSchemeInput = screen.getByTestId("mpfSchemeUuid");

  expect(mpfTrusteeNameInput).toBeInTheDocument();
  expect(mpfSchemeInput).toBeInTheDocument();

  await selectMuiOption(
    user,
    "mpfTrusteeName",
    mockBaseFormData.mpfTrusteeName
  );
  await selectMuiOption(user, "mpfSchemeUuid", mockBaseFormData.mpfSchemeUuid);
}

describe("TransferDataProcessingCreateForm", () => {
  const user = userEvent.setup({ advanceTimers });
  const mockOnSubmit = jest.fn();
  const mockOnReset = jest.fn();

  const mockBaseFormData: TransferCreateFormBaseModel = {
    orsoTrusteeId: "__MOCK_trustee__",
    orsoSchemeName: "mock scheme",
    orsoTrusteeRegistrationNumber: "mock orsoRegistrationNumber",
    orsoOrsoEmployerName: "mock orsoOrsoEmployerName",
    orsoOrsoEmployerAccountNumber: "mock orsoOrsoEmployerAccountNumber",
    orsoTrusteeAddress: mockTrusteeAddress,
    mpfTrusteeName: "mock scheme",
    mpfSchemeUuid: "__MOCK_scheme__",
  };

  const mockBaseMemberData: TransferCreateFormMemberBaseModel = {
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

  const mockSchemeTransferFormData: TransferCreateFormSchemeTransferModel = {
    ...mockBaseFormData,
    transferType: "MMB_SCHEME_TRAN",
    orsoTrusteeEffectiveDateOfTransfer: new Date("2023-04-27"),
    mpfMpfEmployerName: "mock mpfMpfEmployerName",
    mpfMpfEmployerAccountNumber: "mock mpfMpfEmployerAccountNumber",
    mpfPayrollGroupCode: "mock mpfPayrollGroupCode",
    memberList: [
      {
        ...mockBaseMemberData,
        isNewMember: undefined,
        orsoSchemeJoinDate: new Date("2023-04-28"),
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
          ...mockBaseMemberData,
          isNewMember: undefined,
          orsoSchemeJoinDate: new Date("2023-04-28"),
          existingEmployerEmploymentDate: new Date("2023-04-29"),
        },
      ],
    };

  const mockMmbTransferFormData: TransferCreateFormMmbTransferModel = {
    ...mockBaseFormData,
    transferType: "MMB",
    memberList: [{ ...mockBaseMemberData }],
  };

  const mockOnTransferTypeChange = jest.fn();

  test("Test scheme transfer form user interaction", async () => {
    renderWithProviders(
      <Formik
        validationSchema={TransferCreateFormSchemeTransferSchema}
        initialValues={transferCreateFormSchemeTransferInitialValue}
        onSubmit={mockOnSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(formikProps) => (
          <TransferDataProcessingCreateForm
            errorRowIndexes={new Set()}
            transferType="MMB_SCHEME_TRAN"
            onTransferTypeChange={mockOnTransferTypeChange}
            formikProps={formikProps}
            trusteeOptions={mockTrusteeOptions}
            schemeOptions={mockSchemeOptions}
            countryOptions={mockCountryOptions}
            districtOptions={mockDistrictOptions}
            orsoTrusteeList={mockOrsoTrusteeList}
          />
        )}
      </Formik>
    );

    const form = screen.getByTestId("TransferDataProcessingCreateForm");
    expect(form).toBeInTheDocument();

    expect(screen.getByTestId("OriginalORSOSchemeSection")).toBeInTheDocument();
    expect(screen.getByTestId("NewMPFSchemeSection")).toBeInTheDocument();

    await fillBaseFormField(user, mockBaseFormData);

    const orsoTrusteeEffectiveDateOfTransferInput = screen.getByTestId(
      "orsoTrusteeEffectiveDateOfTransfer"
    );

    expect(orsoTrusteeEffectiveDateOfTransferInput).toBeInTheDocument();

    fillMockDatePicker(
      orsoTrusteeEffectiveDateOfTransferInput,
      mockSchemeTransferFormData.orsoTrusteeEffectiveDateOfTransfer
    );

    const mpfMpfEmployerNameInput = screen
      .getByTestId("mpfMpfEmployerName")
      .querySelector("input")!;
    const mpfMpfEmployerAccountNumberInput = screen
      .getByTestId("mpfMpfEmployerAccountNumber")
      .querySelector("input")!;
    const mpfPayrollGroupCodeInput = screen
      .getByTestId("mpfPayrollGroupCode")
      .querySelector("input")!;

    expect(mpfMpfEmployerNameInput).toBeInTheDocument();
    expect(mpfMpfEmployerAccountNumberInput).toBeInTheDocument();
    expect(mpfPayrollGroupCodeInput).toBeInTheDocument();

    mpfMpfEmployerNameInput.focus();
    await user.paste(mockSchemeTransferFormData.mpfMpfEmployerName);

    mpfMpfEmployerAccountNumberInput.focus();
    await user.paste(mockSchemeTransferFormData.mpfMpfEmployerAccountNumber);

    mpfPayrollGroupCodeInput.focus();
    await user.paste(mockIntraGroupTransferFormData.mpfPayrollGroupCode);

    // Add 1 member
    const addButton = screen.getByTestId("AddItemButton");
    expect(addButton).toBeInTheDocument();
    await user.click(addButton);

    await fillInBaseMemberField(user, mockSchemeTransferFormData.memberList[0]);

    const orsoSchemeJoinDateInput = screen.getByTestId(
      `${formTableName}[0].orsoSchemeJoinDate`
    );
    expect(orsoSchemeJoinDateInput).toBeInTheDocument();
    fillMockDatePicker(
      orsoSchemeJoinDateInput,
      mockSchemeTransferFormData.memberList[0].orsoSchemeJoinDate
    );

    const submitButton = screen.getByTestId("submitBtn");
    expect(submitButton).toBeInTheDocument();

    await user.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledWith(
      mockSchemeTransferFormData,
      expect.anything()
    );
  }, 60000);

  test("Test intra group transfer form user interaction", async () => {
    renderWithProviders(
      <Formik
        validationSchema={TransferCreateFormIntraGroupTransferSchema}
        initialValues={transferCreateFormIntraGroupTransferInitialValue}
        onSubmit={mockOnSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(formikProps) => (
          <TransferDataProcessingCreateForm
            errorRowIndexes={new Set()}
            transferType="MMB_INTRA_GROUP"
            onTransferTypeChange={mockOnTransferTypeChange}
            formikProps={formikProps}
            trusteeOptions={mockTrusteeOptions}
            schemeOptions={mockSchemeOptions}
            countryOptions={mockCountryOptions}
            districtOptions={mockDistrictOptions}
            orsoTrusteeList={mockOrsoTrusteeList}
          />
        )}
      </Formik>
    );

    const form = screen.getByTestId("TransferDataProcessingCreateForm");
    expect(form).toBeInTheDocument();

    expect(screen.getByTestId("OriginalORSOSchemeSection")).toBeInTheDocument();
    expect(screen.getByTestId("NewMPFSchemeSection")).toBeInTheDocument();

    await fillBaseFormField(user, mockBaseFormData);

    const orsoTrusteeEffectiveDateOfTransferInput = screen.getByTestId(
      "orsoTrusteeEffectiveDateOfTransfer"
    );

    expect(orsoTrusteeEffectiveDateOfTransferInput).toBeInTheDocument();

    fillMockDatePicker(
      orsoTrusteeEffectiveDateOfTransferInput,
      mockIntraGroupTransferFormData.orsoTrusteeEffectiveDateOfTransfer
    );

    const mpfMpfEmployerNameInput = screen
      .getByTestId("mpfMpfEmployerName")
      .querySelector("input")!;
    const mpfMpfEmployerAccountNumberInput = screen
      .getByTestId("mpfMpfEmployerAccountNumber")
      .querySelector("input")!;
    const mpfPayrollGroupCodeInput = screen
      .getByTestId("mpfPayrollGroupCode")
      .querySelector("input")!;

    expect(mpfMpfEmployerNameInput).toBeInTheDocument();
    expect(mpfMpfEmployerAccountNumberInput).toBeInTheDocument();
    expect(mpfPayrollGroupCodeInput).toBeInTheDocument();

    mpfMpfEmployerNameInput.focus();
    await user.paste(mockIntraGroupTransferFormData.mpfMpfEmployerName);

    mpfMpfEmployerAccountNumberInput.focus();
    await user.paste(
      mockIntraGroupTransferFormData.mpfMpfEmployerAccountNumber
    );

    mpfPayrollGroupCodeInput.focus();
    await user.paste(mockIntraGroupTransferFormData.mpfPayrollGroupCode);

    // Add 1 member
    const addButton = screen.getByTestId("AddItemButton");
    expect(addButton).toBeInTheDocument();
    await user.click(addButton);

    await fillInBaseMemberField(
      user,
      mockIntraGroupTransferFormData.memberList[0]
    );

    const orsoSchemeJoinDateInput = screen.getByTestId(
      `${formTableName}[0].orsoSchemeJoinDate`
    );
    expect(orsoSchemeJoinDateInput).toBeInTheDocument();
    fillMockDatePicker(
      orsoSchemeJoinDateInput,
      mockIntraGroupTransferFormData.memberList[0].orsoSchemeJoinDate
    );

    const existingEmployerEmploymentDateInput = screen.getByTestId(
      `${formTableName}[0].existingEmployerEmploymentDate`
    );
    expect(existingEmployerEmploymentDateInput).toBeInTheDocument();
    fillMockDatePicker(
      existingEmployerEmploymentDateInput,
      mockIntraGroupTransferFormData.memberList[0]
        .existingEmployerEmploymentDate
    );

    const submitButton = screen.getByTestId("submitBtn");
    expect(submitButton).toBeInTheDocument();

    await user.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledWith(
      mockIntraGroupTransferFormData,
      expect.anything()
    );
  }, 60000);

  test("Test mmb transfer form user interaction", async () => {
    renderWithProviders(
      <Formik
        validationSchema={TransferCreateFormMmbTransferSchema}
        initialValues={transferCreateFormMmbTransferInitialValue}
        onSubmit={mockOnSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(formikProps) => (
          <TransferDataProcessingCreateForm
            errorRowIndexes={new Set()}
            transferType="MMB"
            onTransferTypeChange={mockOnTransferTypeChange}
            formikProps={formikProps}
            trusteeOptions={mockTrusteeOptions}
            schemeOptions={mockSchemeOptions}
            countryOptions={mockCountryOptions}
            districtOptions={mockDistrictOptions}
            orsoTrusteeList={mockOrsoTrusteeList}
          />
        )}
      </Formik>
    );

    const form = screen.getByTestId("TransferDataProcessingCreateForm");
    expect(form).toBeInTheDocument();

    expect(screen.getByTestId("OriginalORSOSchemeSection")).toBeInTheDocument();
    expect(screen.getByTestId("NewMPFSchemeSection")).toBeInTheDocument();

    await fillBaseFormField(user, mockBaseFormData);

    const orsoTrusteeEffectiveDateOfTransferInput = screen.queryByTestId(
      "orsoTrusteeEffectiveDateOfTransfer"
    );
    expect(orsoTrusteeEffectiveDateOfTransferInput).toBeNull();

    const mpfMpfEmployerNameInput = screen.queryByTestId("mpfMpfEmployerName");
    const mpfMpfEmployerAccountNumberInput = screen.queryByTestId(
      "mpfMpfEmployerAccountNumber"
    );
    const mpfPayrollGroupCodeInput = screen.queryByTestId(
      "mpfPayrollGroupCode"
    );

    expect(mpfMpfEmployerNameInput).toBeNull();
    expect(mpfMpfEmployerAccountNumberInput).toBeNull();
    expect(mpfPayrollGroupCodeInput).toBeNull();

    // Add 1 member
    const addButton = screen.getByTestId("AddItemButton");
    expect(addButton).toBeInTheDocument();
    await user.click(addButton);

    await fillInBaseMemberField(user, mockMmbTransferFormData.memberList[0]);

    const submitButton = screen.getByTestId("submitBtn");
    expect(submitButton).toBeInTheDocument();

    await user.click(submitButton);
    expect(mockOnSubmit).toHaveBeenCalledWith(
      mockMmbTransferFormData,
      expect.anything()
    );
  }, 60000);

  test("Test clear form", async () => {
    const formikRef: React.MutableRefObject<
      | FormikProps<TransferCreateFormSchemeTransferModel>
      | FormikProps<TransferCreateFormIntraGroupTransferModel>
      | FormikProps<TransferCreateFormMmbTransferModel>
      | null
    > = { current: null };
    function getFormikRef(value: typeof formikRef.current | null) {
      formikRef.current = value;
    }
    renderWithProviders(
      <Formik
        // eslint-disable-next-line react/jsx-no-bind
        innerRef={getFormikRef}
        validationSchema={TransferCreateFormMmbTransferSchema}
        initialValues={transferCreateFormMmbTransferInitialValue}
        onSubmit={mockOnSubmit}
        onReset={mockOnReset}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(formikProps) => (
          <TransferDataProcessingCreateForm
            errorRowIndexes={new Set()}
            transferType="MMB"
            onTransferTypeChange={mockOnTransferTypeChange}
            formikProps={formikProps}
            trusteeOptions={mockTrusteeOptions}
            schemeOptions={mockSchemeOptions}
            countryOptions={mockCountryOptions}
            districtOptions={mockDistrictOptions}
            orsoTrusteeList={mockOrsoTrusteeList}
          />
        )}
      </Formik>
    );

    const clearButton = screen.getByTestId("clearBtn");
    await user.click(clearButton);
    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });
});
