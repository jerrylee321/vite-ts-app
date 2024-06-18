import { useLocation } from "react-router-dom";
import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";

import { RouteMenuItem } from "../../models/route";
import { renderWithProviders } from "../../utils/test/render";

import Sidebar from "./";

const mockRouteMenu: RouteMenuItem[] = [
  {
    path: "/test1",
    labelMessageKey: "Routes.test.route1.label",
  },
  {
    path: "/test2",
    labelMessageKey: "Routes.test.route2.label",
    children: [
      {
        path: "/test2/child1",
        labelMessageKey: "Routes.test.route2.subRoute1.label",
      },
      {
        path: "/test2/child2",
        labelMessageKey: "Routes.test.route2.subRoute2.label",
      },
    ],
  },
  {
    path: "/test3",
    labelMessageKey: "Routes.test.route3.label",
    children: [
      {
        labelMessageKey: "Routes.test.route3.subRoute1.label",
      },
    ],
  },
];

describe(Sidebar, () => {
  beforeEach(() => {
    jest.resetModules();
    const LocationDisplay = () => {
      const location = useLocation();

      return <div data-testid="location-display">{location.pathname}</div>;
    };
    renderWithProviders(
      <>
        <Sidebar routeMenu={mockRouteMenu} />
        <LocationDisplay />
      </>
    );
  });

  it("Show submenu when hovering on collapsed sidebar menu item icon", () => {
    expect(screen.getByTestId("/test1")).toBeInTheDocument();
    expect(screen.getByTestId("/test2")).toBeInTheDocument();
    expect(screen.queryByTestId("/test2/child1")).toBeNull();
    expect(screen.queryByTestId("/test2/child2")).toBeNull();

    fireEvent.mouseOver(screen.getByTestId("/test2"));
    expect(screen.getByTestId("/test2/child1")).toBeInTheDocument();
    expect(screen.getByTestId("/test2/child2")).toBeInTheDocument();
  });

  it("Show submenu item when sidebar is uncollapsed", () => {
    const collapseButton = screen.getByTestId("collapseButton");
    expect(screen.getByTestId("/test1")).toBeInTheDocument();
    expect(screen.getByTestId("/test2")).toBeInTheDocument();
    expect(screen.queryByTestId("/test2/child1")).toBeNull();
    expect(screen.queryByTestId("/test2/child2")).toBeNull();

    fireEvent.click(collapseButton);
    expect(screen.getByTestId("/test2/child1")).toBeInTheDocument();
    expect(screen.getByTestId("/test2/child2")).toBeInTheDocument();

    fireEvent.click(collapseButton);
    expect(screen.queryByTestId("/test2/child1")).toBeNull();
    expect(screen.queryByTestId("/test2/child2")).toBeNull();
  });

  it("Show no path submenu item when sidebar is uncollapsed", () => {
    const collapseButton = screen.getByTestId("collapseButton");
    expect(screen.getByTestId("/test3")).toBeInTheDocument();

    fireEvent.click(collapseButton);
    expect(screen.getByText("Route3-SubRoute1")).toBeInTheDocument();

    fireEvent.click(collapseButton);
    expect(screen.queryByText("Route3-SubRoute1")).toBeNull();
  });

  it("Navigate to correct path when clicking route item link", () => {
    fireEvent.click(screen.getByTestId("/test1"));
    expect(screen.getByTestId("location-display")).toHaveTextContent("/test1");
    fireEvent.click(screen.getByTestId("/test2"));
    expect(screen.getByTestId("location-display")).not.toHaveTextContent(
      "/test2"
    );
  });
});
