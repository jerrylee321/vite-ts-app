import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import AuthRequirementHint from "./AuthRequirementHint";

describe("AuthRequirementHint", () => {
  test("should render", () => {
    renderWithProviders(
      <AuthRequirementHint
        i18nKey="AuthPasswordRequirementHint.length"
        isInvalid={true}
      />
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });
});
