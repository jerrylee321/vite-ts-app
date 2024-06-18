import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";

import CurrentUserAccountProvider from "../providers/CurrentUserAccountProvider";
import { makePortalAccount } from "../types/Portal";

import useCurrentUserAccount from "./useCurrentUserAccount";

jest.unmock("./useCurrentUserAccount");

describe("current user account provider", () => {
  test("should return current user account", () => {
    const { result } = renderHook(() => useCurrentUserAccount(), {
      wrapper: ({ children }) => (
        <CurrentUserAccountProvider
          account={makePortalAccount("mpfa", {
            userAccountDetail: { userName: "John Doe" },
          })}
        >
          {children}
        </CurrentUserAccountProvider>
      ),
    });
    expect(result.current).toMatchObject({
      _portal: "mpfa",
      userAccountDetail: {
        userName: "John Doe",
      },
    });
  });
});
