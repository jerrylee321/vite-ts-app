import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import UpdatesPreviewSection from ".";

describe("SchemeSelector", () => {
  it("should render updates preview section with left aligned label layout", () => {
    renderWithProviders(
      <UpdatesPreviewSection
        indexText="99"
        labelDirection="left"
        originalTitle="Title"
        newTitle="Title"
        originalValues={[
          {
            name: "dummy field",
            value: "dummy value",
          },
        ]}
        newValues={[
          {
            name: "dummy field",
            value: "dummy new value",
          },
        ]}
      />
    );
    expect(screen.getByText(/dummy value/i)).toBeInTheDocument();
    expect(screen.getByText(/dummy new value/i)).toBeInTheDocument();
    expect(screen.getByText(/99/i)).toBeInTheDocument();
    expect(screen.getByTestId("OriginalTitleLabelRight")).toBeInTheDocument();
    expect(screen.getByTestId("NewTitleLabelRight")).toBeInTheDocument();
  });
  it("should render updates preview section with right aligned label layout", () => {
    renderWithProviders(
      <UpdatesPreviewSection
        labelDirection="right"
        originalTitle="Title"
        newTitle="Title"
        originalValues={[
          {
            name: "dummy field",
            value: "dummy value",
          },
        ]}
        newValues={[
          {
            name: "dummy field",
            value: "dummy new value",
          },
        ]}
      />
    );
    expect(screen.getByText(/dummy value/i)).toBeInTheDocument();
    expect(screen.getByText(/dummy new value/i)).toBeInTheDocument();
    expect(screen.getByTestId("OriginalTitleLabelLeft")).toBeInTheDocument();
    expect(screen.getByTestId("NewTitleLabelLeft")).toBeInTheDocument();
  });
});
