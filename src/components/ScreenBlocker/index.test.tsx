import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../utils/test/render";

import { ScreenBlocker, withScreenBlocker } from ".";

describe("ScreenBlocker", () => {
  test("should render if can access", () => {
    const useCanAccess = jest
      .fn()
      .mockReturnValue({ isAccessible: true, isLoading: false });
    const otherwise = jest.fn().mockReturnValue(<>no access right</>);
    renderWithProviders(
      <ScreenBlocker useCanAccess={useCanAccess} otherwise={otherwise}>
        Content
      </ScreenBlocker>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(() => screen.getByText("no access right")).toThrow();
  });

  test("should render if cannot access", () => {
    const useCanAccess = jest
      .fn()
      .mockReturnValue({ isAccessible: false, isLoading: false });
    const otherwise = jest.fn().mockReturnValue(<>no access right</>);
    renderWithProviders(
      <ScreenBlocker useCanAccess={useCanAccess} otherwise={otherwise}>
        Content
      </ScreenBlocker>
    );

    expect(screen.getByText("no access right")).toBeInTheDocument();
    expect(() => screen.getByText("Content")).toThrow();
  });
});

describe("withScreenBlocker", () => {
  test("should render if can access", () => {
    const component = () => <>Content</>;
    const useCanAccess = jest
      .fn()
      .mockReturnValue({ isAccessible: true, isLoading: false });
    const otherwise = jest.fn().mockReturnValue(<>no access right</>);
    const Wrapped = withScreenBlocker({ useCanAccess, otherwise })(component);
    renderWithProviders(<Wrapped />);

    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(() => screen.getByText("no access right")).toThrow();
  });

  test("should render if cannot access", () => {
    const component = () => <>Content</>;
    const useCanAccess = jest
      .fn()
      .mockReturnValue({ isAccessible: false, isLoading: false });
    const otherwise = jest.fn().mockReturnValue(<>no access right</>);
    const Wrapped = withScreenBlocker({ useCanAccess, otherwise })(component);
    renderWithProviders(<Wrapped />);

    expect(screen.getByText("no access right")).toBeInTheDocument();
    expect(() => screen.getByText("Content")).toThrow();
  });
});
