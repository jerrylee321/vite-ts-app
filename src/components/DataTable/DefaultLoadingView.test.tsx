import { I18nextProvider } from "react-i18next";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import i18n from "../../i18n";

import DefaultLoadingView from "./DefaultLoadingView";

test("render", () => {
  render(<DefaultLoadingView />, {
    wrapper: ({ children }) => {
      return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
    },
  });
  expect(screen.getByTestId("loading")).toHaveTextContent("Loading");
});
