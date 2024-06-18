import { act, renderHook, waitFor } from "@testing-library/react";

import useScrollIntoView from "./useScrollIntoView";

describe("useScrollIntoView", () => {
  const mockScrollIntoView = jest.fn();
  const mockElement: HTMLElement = {
    scrollIntoView: mockScrollIntoView,
  } as any;

  beforeEach(() => {
    mockScrollIntoView.mockClear();
  });

  test("render automatic", async () => {
    const { result } = renderHook(() => useScrollIntoView());

    act(() => {
      const { ref } = result.current;
      ref(mockElement);
    });

    await waitFor(() => {
      expect(mockScrollIntoView).toBeCalledTimes(1);
    });
  });

  test("render automatic is false", async () => {
    const { result } = renderHook(() =>
      useScrollIntoView({ automatic: false })
    );

    act(() => {
      const { ref } = result.current;
      ref(mockElement);
    });

    expect(mockScrollIntoView).not.toBeCalled();
  });

  test("render automatic is false but scroll called", async () => {
    const { result } = renderHook(() =>
      useScrollIntoView({ automatic: false })
    );

    act(() => {
      const { ref, scroll } = result.current;
      ref(mockElement);

      scroll();
    });

    await waitFor(() => {
      expect(mockScrollIntoView).toBeCalledTimes(1);
    });
  });

  test("render automatic is false but switch to true", async () => {
    const { rerender, result } = renderHook(
      (props) => useScrollIntoView(props),
      {
        initialProps: { automatic: false },
      }
    );

    act(() => {
      const { ref } = result.current;
      ref(mockElement);
    });

    rerender({ automatic: true });

    await waitFor(() => {
      expect(mockScrollIntoView).toBeCalledTimes(1);
    });
  });
});
