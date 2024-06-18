const mockLogout = jest.fn().mockResolvedValue(undefined);

import { I18nextProvider } from "react-i18next";
import { IIdleTimer } from "react-idle-timer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import i18n from "../i18n";
import { advanceTimers } from "../utils/test/userEvent";

import { useAppIdleTimer } from "./AppIdleTimerProvider";
import IdleAlertProvider from "./IdleAlertProvider";

jest.mock<typeof import("./AppIdleTimerProvider")>(
  "./AppIdleTimerProvider",
  () => {
    return {
      __esModule: true,
      default: jest.fn(() => {
        return <></>;
      }),
      useAppIdleTimer: jest.fn(() => {
        return {
          idleTimer: {} as Partial<IIdleTimer> as IIdleTimer,
          idleTimerState: "initial",
          didLogoutInOtherTab: false,
          resetDidLogoutInOtherTab: jest.fn(),
          disabled: false,
          setDisabled: jest.fn(),
        };
      }),
    };
  }
);

jest.mock("./AuthProvider", () => {
  return {
    __esModule: true,
    useAuth: jest.fn(() => {
      return {
        logout: mockLogout,
      };
    }),
  };
});

describe("IdleAlertProvider", () => {
  it("should render", () => {
    render(<IdleAlertProvider />, {
      wrapper: ({ children }) => (
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      ),
    });
  });

  it("should render dialog", async () => {
    const user = userEvent.setup({ advanceTimers });
    const mockActivate = jest.fn();
    jest.mocked(useAppIdleTimer).mockImplementation(() => {
      return {
        idleTimer: {
          activate: mockActivate,
          getRemainingTime: jest.fn(() => 60000),
        } as Partial<IIdleTimer> as IIdleTimer,
        idleTimerState: "prompt",
        didLogoutInOtherTab: false,
        resetDidLogoutInOtherTab: jest.fn(),
        disabled: false,
        setDisabled: jest.fn(),
      };
    });
    render(<IdleAlertProvider />, {
      wrapper: ({ children }) => (
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      ),
    });
    await user.click(screen.getByTestId("dismissButton"));
    expect(mockActivate).toBeCalledWith();
  });

  it("should render too long dialog", async () => {
    const user = userEvent.setup({ advanceTimers });
    const mockActivate = jest.fn();
    jest.mocked(useAppIdleTimer).mockImplementation(() => {
      return {
        idleTimer: {
          activate: mockActivate,
          getRemainingTime: jest.fn(() => 60000),
        } as Partial<IIdleTimer> as IIdleTimer,
        idleTimerState: "idle",
        didLogoutInOtherTab: false,
        resetDidLogoutInOtherTab: jest.fn(),
        disabled: false,
        setDisabled: jest.fn(),
      };
    });
    render(<IdleAlertProvider />, {
      wrapper: ({ children }) => (
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      ),
    });
    await user.click(screen.getByTestId("dismissButton"));
    expect(mockActivate).not.toBeCalled();
    expect(mockLogout).toBeCalled();
  });
});
