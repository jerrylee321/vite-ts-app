import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import FormCheckboxWithInput from ".";

describe("Form Checkbox With Input", () => {
  it("Should rendering correct components", async () => {
    const { container, rerender } = renderWithProviders(
      <FormCheckboxWithInput
        checkboxProps={{}}
        inputProps={{}}
        helperText="helperText"
        error={false}
      />
    );
    expect(container.getElementsByClassName("MuiInput-root").length).toBe(1);

    rerender(
      <FormCheckboxWithInput
        checkboxProps={{ label: "testLabel" }}
        inputProps={{}}
        helperText={["helperText1", "helperText2"]}
        error={true}
      />
    );

    expect(screen.getByText("testLabel")).toBeInTheDocument();
  });
});
