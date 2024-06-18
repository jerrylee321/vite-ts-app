import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import FormSelect, {
  FormSelectOption,
  renderSelectCommonOption,
} from "./NativeFormSelect";

describe("Form Select", () => {
  it("Should rendering correct components", () => {
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
      >
        <FormSelectOption label={testOptionLabel1} value={testOptionValue1} />
        <FormSelectOption label={testOptionLabel2} value={testOptionValue2} />
      </FormSelect>
    );

    expect(container.getElementsByClassName("MuiInput-root").length).toBe(1);
    expect(container.getElementsByClassName("MuiInput-input").length).toBe(1);
    expect(container.getElementsByTagName("option").length).toBe(3);
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
