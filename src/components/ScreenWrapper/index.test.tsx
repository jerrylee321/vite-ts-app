import { screen } from "@testing-library/react";

import { MessageKey } from "../../i18n/LocaleModel";
import { renderWithProviders } from "../../utils/test/render";

import ScreenWrapper from ".";

test("ScreenWrapper", () => {
  renderWithProviders(
    <ScreenWrapper
      breadcrumbsProps={[{ titleMessageKey: "message key" as MessageKey }]}
      titleMessageKey="Testi18nKey"
    />
  );

  expect(screen.getByText("Test i18n key")).toBeInTheDocument();
});
