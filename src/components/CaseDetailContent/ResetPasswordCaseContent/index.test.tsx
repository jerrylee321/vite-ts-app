import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../utils/test/render";

import ResetPasswordCaseContent from ".";

test("render with login name", () => {
  renderWithProviders(
    <ResetPasswordCaseContent
      detail={{
        userName: "USER_NAME",
        loginName: "LOGIN_NAME",
      }}
    />
  );
  expect(screen.queryByText("USER_NAME")).toBeInTheDocument();
  expect(screen.queryByText("LOGIN_NAME")).toBeInTheDocument();
});

test("render with user id", () => {
  renderWithProviders(
    <ResetPasswordCaseContent
      detail={{
        userName: "USER_NAME",
        userId: "USER_ID",
      }}
    />
  );
  expect(screen.queryByText("USER_NAME")).toBeInTheDocument();
  expect(screen.queryByText("USER_ID")).toBeInTheDocument();
});
