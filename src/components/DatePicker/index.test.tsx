import "@testing-library/jest-dom";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../utils/test/render";
import { advanceTimers } from "../../utils/test/userEvent";

import DatePicker from ".";

describe("DatePicker", () => {
  const user = userEvent.setup({ advanceTimers });
  const mockOnChange = jest.fn();

  it("should dismiss popup by clicking done button", async () => {
    renderWithProviders(
      <DatePicker onChange={mockOnChange} data-testid="datePicker" />
    );

    const datePickerInput = await screen.findByTestId("datePicker");
    expect(datePickerInput).toBeInTheDocument();

    //Dismiss when clicking done Btn
    await user.click(datePickerInput);
    const doneButton = await screen.findByTestId("doneBtn");
    expect(doneButton).toBeInTheDocument();
    await user.click(doneButton);
    await waitFor(() => {
      expect(screen.queryByTestId("doneBtn")).not.toBeInTheDocument();
    });
  });

  it("should dismiss popup by pressing escape button", async () => {
    renderWithProviders(
      <DatePicker onChange={mockOnChange} data-testid="datePicker" />
    );

    const datePickerInput = await screen.findByTestId("datePicker");
    expect(datePickerInput).toBeInTheDocument();

    //Dismiss when key down on esc
    await user.click(datePickerInput);
    const doneButton = await screen.findByTestId("doneBtn");
    expect(doneButton).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByTestId("doneBtn")).not.toBeInTheDocument();
    });
  });

  it("should dismiss popup by clicking outside", async () => {
    renderWithProviders(
      <DatePicker onChange={mockOnChange} data-testid="datePicker" />
    );

    const datePickerInput = await screen.findByTestId("datePicker");
    expect(datePickerInput).toBeInTheDocument();

    //Dismiss when clicking outside
    await user.click(datePickerInput);
    const doneButton = await screen.findByTestId("doneBtn");
    expect(doneButton).toBeInTheDocument();
    // Ref: https://github.com/Pomax/react-onclickoutside/blob/5d1a3ae9d37854ba74e8816cd93d3bb1294e3037/test/test.js#L49
    act(() => {
      document.dispatchEvent(new Event("mousedown"));
    });
    await waitFor(() => {
      expect(screen.queryByTestId("doneBtn")).not.toBeInTheDocument();
    });
  });

  it("should show clear button when it is a range datePicker", async () => {
    renderWithProviders(
      <DatePicker
        onChange={mockOnChange}
        data-testid="datePicker"
        type="range"
      />
    );

    const datePickerInput = screen.getByTestId("datePicker");
    await user.click(datePickerInput);

    const clearButton = await screen.findByTestId("clearBtn");
    expect(clearButton).toBeInTheDocument();
  });

  it("should not show clear button when it is a range datePicker", async () => {
    renderWithProviders(
      <DatePicker
        onChange={mockOnChange}
        data-testid="datePicker"
        type="default"
      />
    );

    const datePickerInput = screen.getByTestId("datePicker");

    await user.click(datePickerInput);
    await waitFor(() => {
      expect(screen.queryByTestId("clearBtn")).not.toBeInTheDocument();
    });
  });
});
