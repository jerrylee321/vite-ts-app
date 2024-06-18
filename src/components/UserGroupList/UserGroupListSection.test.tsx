import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import UserGroupListSection from "./UserGroupListSection";

const mockSchemeNames = ["test schemeName 1"];
const mockUserGroups = [
  {
    userGroupName: "test userGroupName 1",
    userNum: "1",
    userGroupUuid: "test userGroupUuid 1",
    testschemename1: true,
  },
];

const onClickDeleteUserGroupButton = jest.fn();
const onClickViewUserGroupDetailButton = jest.fn();

describe("UserGroupListSection", () => {
  test("Render basic element", () => {
    renderWithProviders(
      <UserGroupListSection
        onClickDeleteUserGroupButton={onClickDeleteUserGroupButton}
        onClickViewUserGroupDetailButton={onClickViewUserGroupDetailButton}
        isLoading={false}
        schemeNames={mockSchemeNames}
        userGroups={mockUserGroups}
        role="Administration-Preparer"
      />
    );
    expect(screen.getByText(/User Group List/i)).toBeInTheDocument();
  });
});
