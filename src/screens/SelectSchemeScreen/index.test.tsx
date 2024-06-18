import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import AppRoutes from "../../routes/AppRoutes";
import { renderRouteWithProviders } from "../../utils/test/render";
import waitForLazyLoad from "../../utils/test/waitForLazyLoad";

describe("select scheme screen", () => {
  test("should render", async () => {
    renderRouteWithProviders([AppRoutes.SelectScheme.path]);
    await waitForLazyLoad(screen);
  });
});
