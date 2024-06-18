import "@testing-library/jest-dom";
import { act, screen } from "@testing-library/react";

import { testUser } from "../../utils/test/auth";
import { renderWithProviders } from "../../utils/test/render";

import NavbarSiteMap from "./SiteMap";
import NavBarUserMenu from "./UserMenu";
import Navbar from ".";

describe(Navbar, () => {
  it("Navbar user menu", () => {
    act(() => {
      renderWithProviders(
        <NavBarUserMenu
          user={{
            name: "Johnny Appleseed",
            email: "johnny.appleseed@example.com",
            username: "johnny.appleseed@example.com",
            role: "User",
            userID: "907dcb67-8be9-4161-9df7-2bd09cac0f62",
          }}
        />
      );
    });

    expect(screen.getByText("Johnny Appleseed")).toBeInTheDocument();
  });

  it("Navbar site map", () => {
    const mockBreadcrumb1 = {
      title: "mockPath1",
    };
    const mockBreadcrumb2 = {
      title: "mockPath2",
    };

    renderWithProviders(<NavbarSiteMap />, {
      breadcrumbPaths: [mockBreadcrumb1, mockBreadcrumb2],
    });
    expect(screen.getByText(mockBreadcrumb1.title)).toBeInTheDocument();
    expect(screen.getByText(mockBreadcrumb2.title)).toBeInTheDocument();
  });

  it("should display name and role", () => {
    act(() => {
      renderWithProviders(<Navbar renderSchemeMenu={true} />, {
        authenticated: testUser,
      });
    });

    expect(screen.getByText(testUser.name)).toBeInTheDocument();
  });

  it("should handle when there is no current user", () => {
    act(() => {
      renderWithProviders(<Navbar renderSchemeMenu={true} />, {
        authenticated: false,
      });
    });
  });
});
