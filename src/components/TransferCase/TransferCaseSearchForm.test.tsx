import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import { fillMockDateRangePicker } from "frontend-common/__mocks__/formDatePicker";

import { renderWithProviders } from "../../utils/test/render";
import { advanceTimers, selectMuiOption } from "../../utils/test/userEvent";

import TransferCaseSearchForm from "./TransferCaseSearchForm";
import {
  TransferCaseSearchFormInitialValue,
  TransferCaseSearchFormModel,
  TransferCaseSearchFormSchema,
} from "./TransferCaseSearchFormModel";

test("should able to render the form", async () => {
  const user = userEvent.setup({ advanceTimers });
  const mockOnSubmit = jest.fn();
  const mockOnReset = jest.fn();
  renderWithProviders(
    <Formik
      initialValues={TransferCaseSearchFormInitialValue}
      validationSchema={TransferCaseSearchFormSchema}
      onSubmit={mockOnSubmit}
      onReset={mockOnReset}
    >
      {(props) => <TransferCaseSearchForm formikProps={props} />}
    </Formik>,
    {
      authenticated: true,
    }
  );

  const submissionDateRangeDatePicker = screen.getByTestId(
    "submissionDateRangeDatePicker"
  );
  expect(submissionDateRangeDatePicker).toBeInTheDocument();
  const transferTypeInput = screen.getByTestId("transferTypeInput");
  expect(transferTypeInput).toBeInTheDocument();
  const transferEffectiveDateRangeDatePicker = screen.getByTestId(
    "transferEffectiveDateRangeDatePicker"
  );
  expect(transferEffectiveDateRangeDatePicker).toBeInTheDocument();
  const referenceNumberInput = screen
    .getByTestId("referenceNumberInput")
    .querySelector("input")!;
  expect(referenceNumberInput).toBeInTheDocument();

  const mockFormData: Required<TransferCaseSearchFormModel> = {
    submissionDateRange: [new Date("2022-01-01"), new Date("2022-02-01")],
    transferType: "MMB",
    transferEffectiveDateRange: [
      new Date("2022-03-01"),
      new Date("2022-04-01"),
    ],
    referenceNumber: "mock referenceNumber",
  };

  fillMockDateRangePicker(
    submissionDateRangeDatePicker,
    mockFormData.submissionDateRange
  );

  await selectMuiOption(user, "transferTypeInput", mockFormData.transferType);

  fillMockDateRangePicker(
    transferEffectiveDateRangeDatePicker,
    mockFormData.transferEffectiveDateRange
  );

  referenceNumberInput.focus();
  await user.paste(mockFormData.referenceNumber);

  const clearBtn = screen.getByTestId("clearFilterBtn");
  const searchBtn = screen.getByTestId("searchBtn");
  expect(clearBtn).toBeInTheDocument();
  expect(searchBtn).toBeInTheDocument();

  await user.click(searchBtn);
  expect(mockOnSubmit).toBeCalledWith(mockFormData, expect.anything());

  await user.click(clearBtn);
  expect(mockOnReset).toBeCalledWith(
    TransferCaseSearchFormInitialValue,
    expect.anything()
  );
});
