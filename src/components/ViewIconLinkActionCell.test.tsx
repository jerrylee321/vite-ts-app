import { CellProps } from "react-table";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../utils/test/render";

import ViewIconLinkActionCell from "./ViewIconLinkActionCell";

test("ViewIconLinkActionCell", async () => {
  const props = {
    value: "https://www.example.com",
  } as jest.Mocked<CellProps<object, string>>;
  renderWithProviders(<ViewIconLinkActionCell {...props} />);
  expect(screen.getByRole("link")).toHaveAttribute(
    "href",
    "https://www.example.com"
  );
});
