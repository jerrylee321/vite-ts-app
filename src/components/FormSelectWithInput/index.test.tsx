import "@testing-library/jest-dom";

import { renderWithProviders } from "../../utils/test/render";

import FormSelectWithInput, { Option } from ".";

describe("Form Select", () => {
  it("Should rendering correct components", () => {
    const testLabel = "testLabel";
    const testHelperText = "testHelperText";
    const { container, rerender } = renderWithProviders(
      <FormSelectWithInput
        id="test"
        selectProps={{}}
        inputProps={{}}
        options={[]}
      />
    );
    expect(container.getElementsByClassName("MuiInput-root").length).toBe(2);

    const testOptions: Option[] = [
      {
        label: "option1",
        value: "value1",
      },
      {
        label: "option2",
        value: "value2",
      },
    ];

    rerender(
      <FormSelectWithInput
        id="test"
        selectProps={{}}
        inputProps={{}}
        label={testLabel}
        selectHelperText={testHelperText}
        options={testOptions}
      />
    );

    expect(container.getElementsByClassName("MuiInput-root").length).toBe(2);
    expect(container.getElementsByClassName("MuiInput-input").length).toBe(2);
    expect(container.getElementsByTagName("option").length).toBe(3);
  });
});
