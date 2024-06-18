import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import FormSelect, { FormSelectOption, renderSelectCommonOption } from "./";

describe("Form Select", () => {
  it("Should rendering correct components", async () => {
    const testLabel = "testLabel";
    const testHelperText = "testHelperText";
    const { container, rerender } = renderWithProviders(<FormSelect />);
    expect(container.getElementsByClassName("MuiInput-root").length).toBe(1);
    expect(
      container.getElementsByClassName("MuiFormHelperText-root").length
    ).toBe(0);

    const testOptionLabel1 = "option1";
    const testOptionValue1 = "value1";
    const testOptionLabel2 = "option2";
    const testOptionValue2 = "value2";

    rerender(
      <FormSelect
        label={testLabel}
        helperText={testHelperText}
        value={testOptionLabel1}
        defaultOpen={true}
      >
        <FormSelectOption value={testOptionValue1}>
          {testOptionLabel1}
        </FormSelectOption>
        <FormSelectOption value={testOptionValue2}>
          {testOptionLabel2}
        </FormSelectOption>
      </FormSelect>
    );

    expect(container.getElementsByClassName("MuiInput-root").length).toBe(1);
    expect(container.getElementsByClassName("MuiInput-input").length).toBe(1);
  });
});

describe("renderSelectCommonOption", () => {
  it("should render a common option selector", () => {
    renderWithProviders(
      renderSelectCommonOption({
        key: "option-key",
        name: "option-label",
      })
    );
    expect(screen.getByText("option-label")).toBeInTheDocument();
  });
});
