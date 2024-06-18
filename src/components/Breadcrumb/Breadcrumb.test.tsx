import { renderWithProviders } from "../../utils/test/render";

import Breadcrumb from "./";

test("should render", () => {
  renderWithProviders(<Breadcrumb titleMessageKey="Breadcrumb.test.message" />);
});
