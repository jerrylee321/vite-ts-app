import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { LookupFn } from "../../types/lookup";
import { renderWithProviders } from "../../utils/test/render";

import ReadOnlyTextField from ".";

test("ReadOnlyTextField Component", () => {
  renderWithProviders(
    <ReadOnlyTextField label="[test label]" value="[test value]" />
  );

  expect(screen.queryByText("[test label]")).toBeInTheDocument();
  expect(screen.queryByText("[test value]")).toBeInTheDocument();
});

test("ReadOnlyTextField Component without value", () => {
  renderWithProviders(<ReadOnlyTextField label="[test label]" value={null} />);

  expect(screen.queryByText("[test label]")).toBeInTheDocument();
  expect(screen.queryByText("N/A")).toBeInTheDocument();
});

test("ReadOnlyTextField Component with date value", () => {
  renderWithProviders(
    <ReadOnlyTextField
      label="[test label]"
      value={new Date(2022, 1, 3)}
      dateFormat="dd/MM/yyyy"
      data-testid="textfield"
    />
  );

  expect(screen.queryByText("[test label]")).toBeInTheDocument();
  expect(screen.queryByTestId("textfieldValue")).toHaveTextContent(
    "03/02/2022"
  );
});

describe("ReadOnlyTextField", () => {
  test("with lookup", () => {
    renderWithProviders(
      <ReadOnlyTextField
        label="[test label]"
        value="code"
        lookup={((v: string) => `mock-${v}`) as LookupFn}
      />
    );

    expect(screen.queryByText("[test label]")).toBeInTheDocument();
    expect(screen.queryByText("mock-code")).toBeInTheDocument();
  });
});
