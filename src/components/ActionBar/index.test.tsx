import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import ActionBar, { ActionBarPrimaryButton, ActionBarSecondaryButton } from ".";

test("ActionBar Component", () => {
  const { container } = renderWithProviders(
    <ActionBar className="bg-primary-main">
      <ActionBarPrimaryButton data-testid="primaryButton">
        primary
      </ActionBarPrimaryButton>
      <ActionBarSecondaryButton data-testid="secondaryButton">
        secondary
      </ActionBarSecondaryButton>
    </ActionBar>
  );

  expect(container.getElementsByClassName("bg-primary-main").length).toBe(1);
  expect(screen.getByTestId("primaryButton")).toBeInTheDocument();
  expect(screen.getByTestId("secondaryButton")).toBeInTheDocument();
});
