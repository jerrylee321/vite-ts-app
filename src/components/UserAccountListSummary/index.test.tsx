import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import UserAccountListSummary from ".";

test("UploadFilePicker Component uploading", async () => {
  renderWithProviders(
    <UserAccountListSummary active={0} inactive={1} total={2} />
  );

  expect(screen.getByText("Active: 0")).toBeInTheDocument();
  expect(screen.getByText("Inactive: 1")).toBeInTheDocument();
  expect(screen.getByText("Total: 2")).toBeInTheDocument();
});
