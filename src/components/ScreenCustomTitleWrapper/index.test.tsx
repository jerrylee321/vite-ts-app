import { Typography } from "@mui/material";
import { screen } from "@testing-library/react";

import { MessageKey } from "../../i18n/LocaleModel";
import { renderWithProviders } from "../../utils/test/render";

import ScreenCustomTitleWrapper from ".";

test("ScreenCustomTitleWrapper", () => {
  renderWithProviders(
    <ScreenCustomTitleWrapper
      breadcrumbsProps={[{ titleMessageKey: "message key" as MessageKey }]}
      title={<Typography>Some Title</Typography>}
    />
  );

  expect(screen.getByText("Some Title")).toBeInTheDocument();
});
