import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import ActionButton from ".";

describe("ActionButton", () => {
  test("Able to render primary button", () => {
    const { container } = renderWithProviders(
      <ActionButton title="actionButton" color="primary" />
    );

    expect(screen.getByText("actionButton")).toBeInTheDocument();
    expect(
      container.getElementsByClassName("bg-actionButton-main").length
    ).toEqual(1);
  });

  test("Able to render secondary button", () => {
    const { container } = renderWithProviders(
      <ActionButton
        titleMessageKey="Testi18nKey"
        color="secondary"
        isLink={true}
      />
    );

    expect(screen.getByText("Test i18n key")).toBeInTheDocument();
    expect(
      container.getElementsByClassName("bg-actionButton-alternative").length
    ).toEqual(1);
  });
});
