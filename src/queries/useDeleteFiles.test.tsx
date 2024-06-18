import { renderHook } from "@testing-library/react";

import AppQueryClientProvider from "../providers/AppQueryClientProvider";

import useDeleteFiles from "./useDeleteFiles";

const executeFn = jest.fn();
const interceptorUseFn = jest.fn();
const interceptorEjectFn = jest.fn();
jest.mock("../providers/APIClientProvider", () => {
  return {
    useAPIClient: () => {
      return {
        apiClient: {
          execute: executeFn,
          axios: {
            interceptors: {
              request: {
                use: interceptorUseFn,
                eject: interceptorEjectFn,
              },
            },
          },
        },
      };
    },
  };
});

beforeEach(() => {
  jest.resetAllMocks();
});

test("useDeleteFiles", async () => {
  const { result } = renderHook(() => useDeleteFiles(), {
    wrapper: ({ children }) => {
      return <AppQueryClientProvider>{children}</AppQueryClientProvider>;
    },
  });

  executeFn.mockResolvedValue({
    success: true,
    payload: true,
  });
  const res = await result.current.mutateAsync(["123456"]);
  expect(res.payload).toEqual(true);
});
