import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { makePortalAccount } from "../types/Portal";

import CurrentUserAccountProvider from "./CurrentUserAccountProvider";

describe("current user account provider", () => {
  test("should render", () => {
    render(
      <CurrentUserAccountProvider account={makePortalAccount("mpfa", {})}>
        <div role="text">Hello</div>
      </CurrentUserAccountProvider>
    );
    expect(screen.queryByRole("text")).toBeInTheDocument();
  });
});
