import "@testing-library/jest-dom";
import "../../i18n";

import { renderWithProviders } from "../../utils/test/render";

import FormAutocompleteInput from ".";

jest.mock("@mui/base/node/AutocompleteUnstyled/useAutocomplete.js", () => {
  return {
    __esModule: true,
    default: jest.fn().mockReturnValue({
      getRootProps: jest.fn(),
      getInputLabelProps: jest.fn(),
      getPopupIndicatorProps: jest.fn(),
      getInputProps: jest.fn(),
    }),
  };
});

const dummyOptions = [
  { id: "1", title: "dummy option 1" },
  { id: "2", title: "dummy option 2" },
  { id: "3", title: "dummy option 3" },
  { id: "4", title: "dummy option 4" },
  { id: "5", title: "dummy option 5" },
  { id: "6", title: "dummy option 6" },
];

describe("AutocompleteInput", () => {
  it("should able to render the input with options", () => {
    const { container } = renderWithProviders(
      <FormAutocompleteInput
        options={dummyOptions}
        selectedItems={[]}
        onChange={jest.fn()}
        name="dummyfield"
      />
    );

    expect(
      container.getElementsByClassName("MuiAutocomplete-root").length
    ).toBe(1);
  });
});
