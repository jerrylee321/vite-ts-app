import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../utils/test/render";
import { advanceTimers } from "../../utils/test/userEvent";

import ConsentSection from "./ConsentSection";

describe("ConsentSection", () => {
  const mockOnIsConsentAcceptedChange = jest.fn();
  const user = userEvent.setup({ advanceTimers });

  test("Should render consent section correctly", async () => {
    renderWithProviders(
      <ConsentSection
        isReadOnly={false}
        isConsentAccepted={true}
        onIsConsentAcceptedChange={mockOnIsConsentAcceptedChange}
      />
    );

    const isConsentAcceptedCheckbox = screen.getByTestId("isConsentAccepted");
    const isConsentAcceptedCheckboxLabel = screen.getByTestId(
      "isConsentAcceptedCheckboxLabel"
    );
    const isConsentAcceptedCheckboxLabelText = screen.getByTestId(
      "isConsentAcceptedCheckboxLabelText"
    );

    expect(isConsentAcceptedCheckboxLabel).toBeInTheDocument();
    expect(isConsentAcceptedCheckbox).toBeInTheDocument();
    expect(isConsentAcceptedCheckbox.querySelector("input")).toBeChecked();
    expect(isConsentAcceptedCheckboxLabelText).toBeInTheDocument();

    await user.click(isConsentAcceptedCheckboxLabel);
    expect(mockOnIsConsentAcceptedChange).toBeCalledWith(false);
  });

  test("Should render readonly consent section correctly", async () => {
    renderWithProviders(
      <ConsentSection
        isReadOnly={true}
        isConsentAccepted={false}
        onIsConsentAcceptedChange={mockOnIsConsentAcceptedChange}
      />
    );

    const isConsentAcceptedCheckbox = screen.getByTestId("isConsentAccepted");
    const isConsentAcceptedCheckboxLabel = screen.getByTestId(
      "isConsentAcceptedCheckboxLabel"
    );
    const isConsentAcceptedCheckboxLabelText = screen.getByTestId(
      "isConsentAcceptedCheckboxLabelText"
    );

    expect(isConsentAcceptedCheckboxLabel).toBeInTheDocument();
    expect(isConsentAcceptedCheckbox).toBeInTheDocument();
    expect(isConsentAcceptedCheckbox.querySelector("input")).not.toBeChecked();
    expect(isConsentAcceptedCheckbox.querySelector("input")).toBeDisabled();
    expect(isConsentAcceptedCheckboxLabelText).toBeInTheDocument();
  });
});
