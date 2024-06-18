import "@testing-library/jest-dom";
import { act } from "@testing-library/react";

import { SubmissionState } from "../../hooks/useFormSubmissionState";
import { renderWithProviders } from "../../utils/test/render";

import ApproveConfirmationDialogFlow from ".";

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
      <ApproveConfirmationDialogFlow
        onConfirmApprove={mockAction}
        submissionState={mockSubmissionState}
        switchToStateInitial={mockSwitchToStateInitial}
        switchToStateTBC={mockSwitchToStateTBC}
        switchToStateSubmitting={mockSwitchToStateSubmitting}
        switchToStateSubmitted={mockSwitchToStateSubmitted}
      />
    );
  });
});
