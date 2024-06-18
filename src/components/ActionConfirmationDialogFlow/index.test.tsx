import "@testing-library/jest-dom";
import { act } from "@testing-library/react";

import { SubmissionState } from "../../hooks/useFormSubmissionState";
import { renderWithProviders } from "../../utils/test/render";

import ActionConfirmationDialogFlow, { DialogContent } from ".";

const mockConfirmationDialogContent: DialogContent = {
  title: "test confirmation dialog title",
  primaryButtonLabel: "test confirmation dialog primary button label",
  secondaryButtonLabel: "test confirmation dialog secondary button label",
};
const mockSubmittedDialogContent: DialogContent = {
  title: "test submitted dialog title",
  primaryButtonLabel: "test submitted dialog primary button label",
};

interface MockRequest {}
interface MockResponse {}
const mockAction = jest.fn();
const mockSubmissionState: SubmissionState<MockRequest, MockResponse> = {
  state: "initial",
};

const mockSwitchToStateInitial = jest.fn().mockReturnValue({
  state: "initial",
});
const mockSwitchToStateTBC = jest.fn().mockReturnValue({
  state: "toBeConfirmed",
});
const mockSwitchToStateSubmitting = jest.fn().mockReturnValue({
  state: "submitting",
});
const mockSwitchToStateSubmitted = jest.fn().mockReturnValue({
  state: "submitted",
});

test("Dialog with confirmation", () => {
  act(() => {
    renderWithProviders(
      <ActionConfirmationDialogFlow
        confirmationDialogContent={mockConfirmationDialogContent}
        submittedDialogContent={mockSubmittedDialogContent}
        onConfirm={mockAction}
        submissionState={mockSubmissionState}
        switchToStateInitial={mockSwitchToStateInitial}
        switchToStateTBC={mockSwitchToStateTBC}
        switchToStateSubmitting={mockSwitchToStateSubmitting}
        switchToStateSubmitted={mockSwitchToStateSubmitted}
      />
    );
  });
});
