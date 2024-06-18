import { renderHook, waitFor } from "@testing-library/react";

import usePromise, { promiseWithTimeout } from "./usePromise";

describe("usePromise", () => {
  test("render", () => {
    const { result } = renderHook(() => usePromise());

    const [promise, _resolve, _reject] = result.current;
    expect(promise).toBeInstanceOf(Promise);
  });

  test("render and resolve", async () => {
    const { result } = renderHook(() => usePromise<string>());

    await waitFor(() => {
      const [_promise, resolve, _reject] = result.current;
      expect(resolve).not.toBeUndefined();
    });

    const [promise, resolve, _reject] = result.current;
    resolve!("done");

    expect(await promise).toEqual("done");
  });

  test("render and reject", async () => {
    const { result } = renderHook(() => usePromise<string>());

    await waitFor(() => {
      const [_promise, _resolve, reject] = result.current;
      expect(reject).not.toBeUndefined();
    });

    const [promise, _resolve, reject] = result.current;
    reject!("error");

    await expect(async () => {
      await promise;
    }).rejects.toEqual("error");
  });
});

describe("promiseWithTimeout", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test("wait resolve", async () => {
    const p = promiseWithTimeout(Promise.resolve(), 1000);

    jest.advanceTimersByTime(2000);

    await expect(p).resolves.toBe(undefined);
  });

  test("wait timeout", async () => {
    const p = promiseWithTimeout(
      new Promise((_resolve) => {
        /* do nothing */
      }),
      1000
    );

    jest.advanceTimersByTime(2000);

    await expect(p).rejects.toBe(undefined);
  });
});
