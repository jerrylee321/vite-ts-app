import { RouteMenuResult } from "../../models/route";
import { renderWithProviders } from "../../utils/test/render";

import Layout from ".";

const mockUseMenu = jest.fn<RouteMenuResult, []>().mockImplementation(() => ({
  data: [],
  isLoading: false,
  error: null,
}));

describe("Layout", () => {
  test("should render", () => {
    renderWithProviders(<Layout useMenu={mockUseMenu} />);
  });
});
