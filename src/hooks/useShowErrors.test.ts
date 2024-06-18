import { act, waitFor } from "@testing-library/react";

import { useErrorAlert } from "../providers/ErrorAlertProvider";
import { renderHookWithProviders } from "../utils/test/render";

import useShowErrors from "./useShowErrors";

jest.mock("../providers/ErrorAlertProvider", () => ({
  __esModule: true,
  ...jest.requireActual("../providers/ErrorAlertProvider"),
  useErrorAlert: jest.fn().mockReturnValue({
    show: jest.fn(),
  }),
}));

describe("useShowErrors", () => {
  const mockShow = jest.mocked(useErrorAlert().show);
  it("should able to show error", () => {
    const error = new Error("test");
    renderHookWithProviders(() => useShowErrors([error]));

    expect(mockShow).toBeCalled();
  });

  it("should able to show error map", () => {
    const error = new Error("test");
    renderHookWithProviders(() => useShowErrors({ e: error }));

    expect(mockShow).toBeCalled();
  });

  it("should do nothing for null", () => {
    renderHookWithProviders(() => useShowErrors(null));

    expect(mockShow).not.toBeCalled();
  });

  it("should do nothing", () => {
    renderHookWithProviders(() => useShowErrors([null]));

    expect(mockShow).not.toBeCalled();
  });

  it("should show multiple error", async () => {
    const error1 = new Error("test1");
    const error2 = new Error("test2");
    renderHookWithProviders(() => useShowErrors([error1, error2]));

    await waitFor(() => {
      expect(mockShow).toBeCalledWith(error1, expect.anything());
    });
    const call = mockShow.mock.lastCall!;
    act(() => {
      call[1]?.onDismiss?.();
    });

    await waitFor(() => {
      expect(mockShow).toBeCalledWith(error2, expect.anything());
    });
  });

  it("should show new error when it changes", async () => {
    const error1 = new Error("test1");
    const error2 = new Error("test2");
    const { rerender } = renderHookWithProviders(
      (prop) => useShowErrors([prop]),
      { initialProps: error1 }
    );

    await waitFor(() => {
      expect(mockShow).toBeCalledWith(error1, expect.anything());
    });
    const call = mockShow.mock.lastCall!;
    act(() => {
      call[1]?.onDismiss?.();
    });

    rerender(error2);

    await waitFor(() => {
      expect(mockShow).toBeCalledWith(error2, expect.anything());
    });
  });

  afterEach(() => mockShow.mockClear());
});
