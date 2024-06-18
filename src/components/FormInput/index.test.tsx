import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import FormInput from ".";

describe("Form Input", () => {
  const testLabel = "testLabel";
  const testHelperText = "testHelperText";
  const testValue = "testValue";

  it("Rendering normal input field", () => {
    const { container } = renderWithProviders(<FormInput />);
    expect(container.getElementsByClassName("MuiInput-root").length).toBe(1);
    expect(container.getElementsByClassName("MuiFormLabel-root").length).toBe(
      0
    );
    expect(
      container.getElementsByClassName("MuiFormHelperText-root").length
    ).toBe(0);
  });

  it("should display label and helper text", () => {
    const { container } = renderWithProviders(
      <FormInput
        label={testLabel}
        helperText={testHelperText}
        value={testValue}
      />
    );

    expect(container.getElementsByClassName("MuiInput-root").length).toBe(1);
    expect(
      container.getElementsByClassName("MuiInput-input").item(0)
    ).toHaveDisplayValue(testValue);
    expect(container.getElementsByClassName("MuiFormLabel-root").length).toBe(
      1
    );
    expect(
      container.getElementsByClassName("MuiFormLabel-root").item(0)?.textContent
    ).toBe(testLabel);
    expect(
      container.getElementsByClassName("MuiFormHelperText-root").length
    ).toBe(1);
    expect(
      container.getElementsByClassName("MuiFormHelperText-root").item(0)
        ?.textContent
    ).toBe(testHelperText);
  });

  it("Render text area", () => {
    const { container, rerender } = render(<FormInput textArea={true} />);
    expect(
      container.getElementsByClassName("MuiOutlinedInput-root").length
    ).toBe(1);
    expect(container.getElementsByClassName("MuiFormLabel-root").length).toBe(
      0
    );
    expect(
      container.getElementsByClassName("MuiFormHelperText-root").length
    ).toBe(0);

    rerender(
      <FormInput
        label={testLabel}
        helperText={testHelperText}
        value={testValue}
        textArea={true}
      />
    );

    expect(
      container.getElementsByClassName("MuiOutlinedInput-root").length
    ).toBe(1);
    expect(
      container.getElementsByClassName("MuiOutlinedInput-input").item(0)
    ).toHaveDisplayValue(testValue);
    expect(container.getElementsByClassName("MuiFormLabel-root").length).toBe(
      1
    );
    expect(
      container.getElementsByClassName("MuiFormLabel-root").item(0)?.textContent
    ).toBe(testLabel);
    expect(
      container.getElementsByClassName("MuiFormHelperText-root").length
    ).toBe(1);
    expect(
      container.getElementsByClassName("MuiFormHelperText-root").item(0)
        ?.textContent
    ).toBe(testHelperText);
  });
});
