import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import QuickSearch from ".";

describe("Quick Search test", () => {
  it("Clear Text by clicking clear icon", () => {
    const testString = "Input Text";
    renderWithProviders(
      <QuickSearch setGlobalFilter={jest.fn()} pageIndex={0} />
    );

    const quickSearchInput = screen.getByTestId("input");
    fireEvent.change(quickSearchInput, {
      target: { value: testString },
    });
    expect(quickSearchInput).toHaveValue(testString);

    fireEvent.click(screen.getByTestId("clearBtn"));
    expect(quickSearchInput).toHaveValue("");
  });

  it("Clear Text by clicking updating page index", () => {
    const testString = "Input Text";
    const { rerender } = renderWithProviders(
      <QuickSearch setGlobalFilter={jest.fn()} pageIndex={0} />
    );

    const quickSearchInput = screen.getByTestId("input");
    fireEvent.change(quickSearchInput, {
      target: { value: testString },
    });
    expect(quickSearchInput).toHaveValue(testString);

    rerender(<QuickSearch setGlobalFilter={jest.fn()} pageIndex={1} />);
    expect(quickSearchInput).toHaveValue("");
  });
});
