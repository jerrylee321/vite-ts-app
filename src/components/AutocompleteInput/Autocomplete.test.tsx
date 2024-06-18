import "@testing-library/jest-dom";
import "../../i18n";
import { render, screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";
import { setupUserEvent } from "../../utils/test/userEvent";

import AutocompleteInput, {
  AutocompletePaper,
  defaultIsOptionEqualToValue,
  defaultRenderOption,
  defaultRenderTags,
  getDefaultDisplayText,
  withAutocompletePaperOptions,
} from ".";

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
      <AutocompleteInput
        options={dummyOptions}
        selectedItems={[]}
        onChange={jest.fn()}
        name="dummy ac"
      />
    );

    expect(
      container.getElementsByClassName("MuiAutocomplete-root").length
    ).toBe(1);
  });

  it("should able to render selected item with options", () => {
    const { container } = render(
      <div>
        {defaultRenderTags(dummyOptions, jest.fn().mockReturnValue({}))}
      </div>
    );

    expect(
      container.getElementsByClassName("MuiChip-root").length
    ).toBeGreaterThan(0);
  });

  it("should able to render list item", () => {
    render(
      defaultRenderOption({}, dummyOptions[0], {
        inputValue: "string",
        index: 0,
        selected: true,
      })
    );

    expect(screen.getByText(dummyOptions[0].title)).toBeInTheDocument();
  });

  it("should able to compare the selected option", () => {
    expect(defaultIsOptionEqualToValue(dummyOptions[0], dummyOptions[0])).toBe(
      true
    );
    expect(defaultIsOptionEqualToValue(dummyOptions[0], dummyOptions[1])).toBe(
      false
    );
  });

  it("should able to extract display text from option", () => {
    expect(getDefaultDisplayText(dummyOptions[0])).toBe(dummyOptions[0].title);
  });
});

describe("AutocompletePaper", () => {
  const user = setupUserEvent();

  it("should able to render the list", () => {
    renderWithProviders(
      <AutocompletePaper
        showDoneButton={true}
        showDeselectAllButton={true}
        showSelectAllButton={true}
      >
        dummy
      </AutocompletePaper>
    );
    expect(screen.getByText("dummy")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("Select All")).toBeInTheDocument();
    expect(screen.getByText("Deselect All")).toBeInTheDocument();
  });

  it("should able to select all", async () => {
    const mockFn = jest.fn();
    renderWithProviders(
      <AutocompletePaper showSelectAllButton={true} onSelectAll={mockFn}>
        dummy
      </AutocompletePaper>
    );
    await user.click(screen.getByText("Select All"));
    expect(mockFn).toBeCalled();
  });

  it("should able to deselect all", async () => {
    const mockFn = jest.fn();
    renderWithProviders(
      <AutocompletePaper showDeselectAllButton={true} onDeselectAll={mockFn}>
        dummy
      </AutocompletePaper>
    );
    await user.click(screen.getByText("Deselect All"));
    expect(mockFn).toBeCalled();
  });

  it("should able to render the list without buttons", () => {
    renderWithProviders(<AutocompletePaper>dummy</AutocompletePaper>);
    expect(screen.getByText("dummy")).toBeInTheDocument();
    expect(screen.queryByText("Done")).not.toBeInTheDocument();
    expect(screen.queryByText("Select All")).not.toBeInTheDocument();
    expect(screen.queryByText("Deselect All")).not.toBeInTheDocument();
  });

  it("withAutocompletePaperOptions", () => {
    const Paper = withAutocompletePaperOptions({});
    renderWithProviders(<Paper>dummy</Paper>);
    expect(screen.getByText("dummy")).toBeInTheDocument();
  });
});
