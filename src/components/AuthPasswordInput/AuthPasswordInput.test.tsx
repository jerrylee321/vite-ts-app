import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import AuthPasswordInput from "./";

test("should render", () => {
  renderWithProviders(<AuthPasswordInput />);
});

test("should toggle", async () => {
  renderWithProviders(<AuthPasswordInput />);
  fireEvent.click(screen.getByTestId("toggle"));
});
