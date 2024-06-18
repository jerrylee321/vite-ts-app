import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import DateDialog from ".";

describe("DateDialog", () => {
  const mockOnChange = jest.fn();

  it("should render the dialog", async () => {
    renderWithProviders(
      <DateDialog
        title="Announcement.title"
        open={true}
        onDateChange={mockOnChange}
        onClose={jest.fn()}
        initDate={new Date()}
      />
    );

    expect(screen.getByText("Announcement")).toBeInTheDocument();
  });
});
