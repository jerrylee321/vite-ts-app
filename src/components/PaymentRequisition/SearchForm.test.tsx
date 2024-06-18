import "@testing-library/jest-dom";
import "../../i18n";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CommonOption } from "frontend-common/src/models/option";

import { renderWithProviders } from "../../utils/test/render";
import { advanceTimers, selectMuiOption } from "../../utils/test/userEvent";

import { SearchForm } from "./SearchForm";
import { SearchFormModel } from "./SearchFormModel";

describe("SearchForm component", () => {
  const mockTransferTypeOptions: CommonOption[] = [
    {
      key: "mockTransferTypeKey1",
      name: "mockTransferTypeName1",
    },
    {
      key: "mockTransferTypeKey2",
      name: "mockTransferTypeName2",
    },
  ];
  const mockFormData: Required<SearchFormModel> = {
    billingRefNo: "mockBillingRefNo",
    transferType: "mockTransferTypeKey1",
    submissionRefNo: "mockSubmissionRefNo",
    paymentNotificationDateRange: [
      new Date("2023-01-01"),
      new Date("2023-02-01"),
    ],
  };

  const mockIsSearchFilterEmpty = jest.fn().mockReturnValue(false);

  const user = userEvent.setup({ advanceTimers });

  it("should render components", async () => {
    const mockOnSubmit = jest.fn();
    await act(() =>
      renderWithProviders(
        <SearchForm
          onSubmit={mockOnSubmit}
          transferTypeOptions={mockTransferTypeOptions}
          isSearchFilterEmpty={mockIsSearchFilterEmpty}
          searchFormParamsValue={mockFormData}
        />
      )
    );

    expect(
      screen.getByTestId("paymentRequisitionSearchForm")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("billingRefNo").querySelector("input")!
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("submissionRefNo").querySelector("input")!
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("transferType").querySelector("input")!
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("paymentNotificationDateRange")
    ).toBeInTheDocument();
  });

  it("Should able to submit the form", async () => {
    const mockOnSubmit = jest.fn();

    const { container } = renderWithProviders(
      <SearchForm
        onSubmit={mockOnSubmit}
        transferTypeOptions={mockTransferTypeOptions}
        isSearchFilterEmpty={mockIsSearchFilterEmpty}
        searchFormParamsValue={mockFormData}
      />
    );

    const billingRefNoInput = screen
      .getByTestId("billingRefNo")
      .querySelector("input")!;
    billingRefNoInput.focus();
    await user.paste(mockFormData.billingRefNo);

    const submissionRefNoInput = screen
      .getByTestId("submissionRefNo")
      .querySelector("input")!;
    submissionRefNoInput.focus();
    await user.paste(mockFormData.submissionRefNo);

    await selectMuiOption(user, "transferType", mockFormData.transferType);

    await user.click(screen.getByTestId("paymentNotificationDateRange"));
    await user.click(
      container.querySelectorAll(
        ".react-datepicker__day:not(.react-datepicker__day--outside-month)"
      )[0]
    );
    await user.click(
      container.querySelectorAll(
        ".react-datepicker__day:not(.react-datepicker__day--outside-month)"
      )[1]
    );
    await user.click(screen.getByTestId("doneBtn"));

    await user.click(screen.getByTestId("searchBtn"));
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  }, 10000);
});
