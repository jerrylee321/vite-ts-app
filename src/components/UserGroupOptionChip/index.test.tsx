import { render, screen } from "@testing-library/react";

import { setupUserEvent } from "../../utils/test/userEvent";

import UserGroupOptionChip from "./";

describe("UserGroupOptionChip", () => {
  const user = setupUserEvent();
  test("render", async () => {
    const mockDelete = jest.fn();
    render(
      <UserGroupOptionChip
        option={{ title: "Hello World", id: "world" }}
        index={1}
        onDelete={mockDelete}
        data-testid="list.1.userGroupUuids.1"
      />
    );
    await user.click(
      await screen.findByTestId("list.1.userGroupUuids.1.remove")
    );

    expect(mockDelete).toBeCalledWith(1);
  });
});
