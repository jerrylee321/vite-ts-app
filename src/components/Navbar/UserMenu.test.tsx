import { screen } from "@testing-library/react";

import { User } from "../../models/user";
import { renderWithProviders } from "../../utils/test/render";
import { setupUserEvent } from "../../utils/test/userEvent";

import NavBarUserMenu from "./UserMenu";

describe("NavBarUserMenu", () => {
  const currentUser: User = {
    email: "johndoe@example.com",
    name: "John Doe",
    role: "Preparer",
    userID: "user-id",
    username: "johndoe",
  };
  const mockLogout = jest.fn();
  const user = setupUserEvent();

  beforeEach(() => {
    mockLogout.mockClear();
  });

  test("render", () => {
    renderWithProviders(
      <NavBarUserMenu user={currentUser} onLogout={mockLogout} />
    );
  });

  test("change password", async () => {
    renderWithProviders(
      <NavBarUserMenu user={currentUser} onLogout={mockLogout} />
    );

    await user.click(await screen.findByRole("button"));
    const [changePasswordMenu, _] = await screen.findAllByRole("menuitem");
    await user.click(changePasswordMenu);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  test("logout", async () => {
    renderWithProviders(
      <NavBarUserMenu user={currentUser} onLogout={mockLogout} />
    );

    await user.click(await screen.findByRole("button"));
    const [_, logoutMenu] = await screen.findAllByRole("menuitem");
    await user.click(logoutMenu);
    expect(mockLogout).toBeCalled();
  });
});
