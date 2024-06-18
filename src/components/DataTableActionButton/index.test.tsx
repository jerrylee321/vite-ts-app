import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import DataTableActionButton from ".";

test("DataTableActionButton Component", () => {
  const testMessage = "testMessage";
  const testFunction = jest.fn();
  renderWithProviders(
    <DataTableActionButton message={testMessage} onClick={testFunction} />
  );

  expect(screen.getByText(testMessage)).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button"));
  expect(testFunction).toBeCalledTimes(1);
});
