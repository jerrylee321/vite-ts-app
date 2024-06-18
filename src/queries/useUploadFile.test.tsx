import { renderHook } from "@testing-library/react";

import AppQueryClientProvider from "../providers/AppQueryClientProvider";

import useUploadFile from "./useUploadFile";

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

test("useUploadFile", async () => {
  const { result } = renderHook(() => useUploadFile(), {
    wrapper: ({ children }) => {
      return <AppQueryClientProvider>{children}</AppQueryClientProvider>;
    },
  });

  executeFn.mockResolvedValue({
    success: true,
    payload: {
      id: "123456",
    },
  });
  const res = await result.current.mutateAsync({
    request: {
      uploader: "tester",
      branch: "test",
      file: new File(["test"], "test.txt"),
    },
  });
  expect(res.id).toEqual("123456");
});
