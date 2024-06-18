import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import FormLegend from ".";

describe("Form Legend", () => {
  const testValue = "testValue";

  it("Should render asterisk", () => {
    renderWithProviders(<FormLegend isRequired={true} text={testValue} />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("Should not render asterisk", () => {
    renderWithProviders(<FormLegend isRequired={false} text={testValue} />);
    expect(screen.queryByText("*")).toBeNull();
  });
});
