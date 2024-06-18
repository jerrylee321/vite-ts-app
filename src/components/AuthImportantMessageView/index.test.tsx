import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import AuthImportantMessageView from ".";

describe("AuthImportantMessageView", () => {
  test("with title and message", () => {
    renderWithProviders(
      <AuthImportantMessageView
        data-testid="important-message"
        title="the-title"
        message="the-message"
      />
    );
    expect(screen.getByTestId("important-message")).toHaveTextContent(
      "the-title"
    );
    expect(screen.getByTestId("important-message")).toHaveTextContent(
      "the-message"
    );
  });

  test("without message", () => {
    renderWithProviders(
      <AuthImportantMessageView
        data-testid="important-message"
        title="the-title"
      />
    );
    expect(screen.getByTestId("important-message")).toHaveTextContent(
      "the-title"
    );
  });
});
