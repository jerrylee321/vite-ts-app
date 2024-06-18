import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import ReadOnlyTextTable from ".";

describe("ReadOnlyTextFieldTable Component", () => {
  test("Render basic element", () => {
    renderWithProviders(
      <ReadOnlyTextTable
        dataSet={[
          { label: "[test label1]", value: "[test value1]" },
          { label: "[test label2]", value: "[test value2]" },
          { label: "[test label3]", value: "[test value3]" },
        ]}
      />
    );

    expect(screen.queryByText("[test label1]")).toBeInTheDocument();
    expect(screen.queryByText("[test value1]")).toBeInTheDocument();
    expect(screen.queryByText("[test label2]")).toBeInTheDocument();
    expect(screen.queryByText("[test value2]")).toBeInTheDocument();
    expect(screen.queryByText("[test label3]")).toBeInTheDocument();
    expect(screen.queryByText("[test value3]")).toBeInTheDocument();
  });

  // Test undefined dataSet
  test("Render undefined dataSet", () => {
    const mockDataSet = [
      {
        label: "[test label]",
        value: undefined,
        "data-testid": undefined,
      },
    ];

    renderWithProviders(<ReadOnlyTextTable dataSet={mockDataSet} />);
    expect(screen.queryByText("[test label]")).toBeInTheDocument();
  });
});
