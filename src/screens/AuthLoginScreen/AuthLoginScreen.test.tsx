import { act } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import AuthLoginScreen from "./";

describe("AuthLoginScreen", () => {
  test("render", async () => {
    await act(async () => {
      renderWithProviders(<AuthLoginScreen />, { authenticated: false });
    });
  });
});
