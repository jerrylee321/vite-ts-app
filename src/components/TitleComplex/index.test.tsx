import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import TitleComplex from ".";

test("TitleComplex", () => {
  renderWithProviders(
    <TitleComplex
      titleBottom={<div>Title bottom</div>}
      titleRight={<div>Title right</div>}
      titleMessageKey="ErrorScreen.title"
    />
  );

  expect(screen.getByText("Title bottom")).toBeInTheDocument();
  expect(screen.getByText("Title right")).toBeInTheDocument();
  expect(screen.getByText("Error")).toBeInTheDocument();
});
