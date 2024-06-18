import "@testing-library/jest-dom";
import { FormControlLabel, Radio } from "@mui/material";

import { renderWithProviders } from "../../utils/test/render";
import { CheckedIcon, UncheckedIcon } from "../RadioIcon";

import FormRadioGroup from ".";

describe("Form Input", () => {
  it("Rendering normal input field", () => {
    const { container } = renderWithProviders(<FormRadioGroup />);
    expect(container.getElementsByClassName("MuiFormLabel-root").length).toBe(
      0
    );
    expect(container.getElementsByClassName("MuiFormGroup-root").length).toBe(
      1
    );
  });

  it("should display label", () => {
    const testLabel = "testLabel";
    const testValue = true;
    const { container } = renderWithProviders(
      <FormRadioGroup label={testLabel} value={testValue}>
        <FormControlLabel
          control={
            <Radio
              data-testid="FormRadioGroup.option.true"
              icon={<UncheckedIcon />}
              checkedIcon={<CheckedIcon />}
            />
          }
          value={true}
          label="True"
        />
        <FormControlLabel
          control={
            <Radio
              data-testid="FormRadioGroup.option.false"
              icon={<UncheckedIcon />}
              checkedIcon={<CheckedIcon />}
            />
          }
          value={false}
          label="False"
        />
      </FormRadioGroup>
    );

    expect(container.getElementsByClassName("MuiFormGroup-root").length).toBe(
      1
    );
    expect(container.getElementsByClassName("MuiFormLabel-root").length).toBe(
      1
    );
    expect(
      container.getElementsByClassName("MuiFormLabel-root").item(0)?.textContent
    ).toBe(testLabel);
  });
});
