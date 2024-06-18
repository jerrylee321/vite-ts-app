import "@testing-library/jest-dom";

import { renderWithProviders } from "../../utils/test/render";

import PageTitle from ".";

test("PageTitle Component", () => {
  const { container } = renderWithProviders(
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <PageTitle className="test-class-name">[test title]</PageTitle>
  );

  expect(container.getElementsByClassName("test-class-name").length).toBe(1);
  expect(container.textContent?.includes("[test title]")).toBe(true);
});
