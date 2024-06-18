import {
  TransferCaseSearchFormInitialValue,
  TransferCaseSearchFormModel,
  TransferCaseSearchFormSchema,
} from "./TransferCaseSearchFormModel";

const mockTransferCaseSearchFormData: TransferCaseSearchFormModel = {
  submissionDateRange: [new Date("2023-01-01"), new Date("2023-02-02")],
  transferType: "mock type",
  transferEffectiveDateRange: [null, null],
  referenceNumber: "ABCD 1234",
};

describe("TransferCaseSearchFormModel schema test", () => {
  test("initial value should satisfy schema", () => {
    expect(
      TransferCaseSearchFormSchema.isValidSync(
        TransferCaseSearchFormInitialValue
      )
    ).toBeTruthy();
  });

  test("mock value should satisfy schema", () => {
    expect(
      TransferCaseSearchFormSchema.isValidSync(mockTransferCaseSearchFormData)
    ).toBeTruthy();
  });
});
