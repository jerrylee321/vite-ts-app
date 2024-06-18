import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "../../utils/test/render";
import { advanceTimers } from "../../utils/test/userEvent";

import {
  UserGroupDeleteButton,
  UserGroupDetailButton,
} from "./UserGroupListColumns";

const onClickViewUserGroupDetailButton = jest.fn();
const onClickDeleteUserGroupButton = jest.fn();

describe("UserGroupListColumn", () => {
  test("delete button ", async () => {
    const user = userEvent.setup({ advanceTimers });
    renderWithProviders(
      <UserGroupDeleteButton
        userGroupId="test-user-group-uuid"
        onClickDeleteUserGroupButton={onClickDeleteUserGroupButton}
      />
    );

    await user.click(screen.getByTestId("deleteUserGroupButton"));
  });

  test("detail button ", async () => {
    const user = userEvent.setup({ advanceTimers });

    renderWithProviders(
      <UserGroupDetailButton
        userGroupId="test-user-group-uuid"
        onClickViewUserGroupDetailButton={onClickViewUserGroupDetailButton}
      />
    );
    await user.click(screen.getByTestId("userGroupDetailButton"));
  });
});
