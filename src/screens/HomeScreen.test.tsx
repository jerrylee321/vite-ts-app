import { renderWithProviders } from "../utils/test/render";

import HomeScreen from "./HomeScreen";

test("should render", () => {
  renderWithProviders(<HomeScreen />);
});
