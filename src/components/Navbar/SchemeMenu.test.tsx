import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import SchemeMenu from "./SchemeMenu";

const mockSchemeName = "name";
describe("SchemeMenu", () => {
  test("should render", async () => {
    renderWithProviders(<SchemeMenu schemeName={mockSchemeName} />);

    fireEvent.click(screen.getByTestId("schemeMenuButton"));
  });
});
