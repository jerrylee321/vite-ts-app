const mockValidatePassword = jest.fn<
  Promise<ValidatePasswordResult>,
  [ValidatePasswordRequest]
>();

import { act, waitFor } from "@testing-library/react";

import { ValidatePasswordRequest } from "../apis/CommonAuthenticationAPI";
import {
  initialResult,
  ValidatePasswordResult,
} from "../models/CommonAuthentication";
import { renderHookWithProviders } from "../utils/test/render";

import usePasswordValidator, {
  passwordStateReducer,
} from "./usePasswordValidator";

const emptyValue = "";
const someStringValue = "abc";

describe("passwordStateReducer", () => {
  test("change", () => {
    expect(
      passwordStateReducer(
        { password: emptyValue, validationResult: initialResult },
        {
          type: "change",
          validationResult: { ...initialResult, username: true },
          password: someStringValue,
        }
      )
    ).toMatchObject({
      password: someStringValue,
      validationResult: expect.objectContaining({
        username: true,
      }),
    });
  });

  test("validate", () => {
    expect(
      passwordStateReducer(
        { password: someStringValue, validationResult: initialResult },
        {
          type: "validate",
          validationResult: { ...initialResult, username: true },
          password: someStringValue,
        }
      )
    ).toMatchObject({
      password: someStringValue,
      validationResult: expect.objectContaining({
        username: true,
      }),
    });
  });

  test("validate but password changed", () => {
    expect(
      passwordStateReducer(
        { password: emptyValue, validationResult: initialResult },
        {
          type: "validate",
          validationResult: { ...initialResult, username: true },
          password: someStringValue,
        }
      )
    ).toMatchObject({ password: emptyValue, validationResult: initialResult });
  });
});

describe("usePasswordValidator", () => {
  beforeEach(() => {
    mockValidatePassword.mockReset();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("render", async () => {
    mockValidatePassword.mockResolvedValue({
      ...initialResult,
      strength: true,
    });

    const { result } = renderHookWithProviders(
      (initialProps) =>
        usePasswordValidator(initialProps.password, {
          validateAsync: mockValidatePassword,
        }),
      {
        initialProps: {
          password: emptyValue,
        },
      }
    );

    expect(result.current.isValid).toBeFalsy();
    expect(result.current.result).toMatchObject({
      length: false,
    });

    await waitFor(() => {
      expect(result.current.isValidating).toBeTruthy();
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(result.current.isValidating).toBeFalsy();
    });

    expect(result.current.result).toMatchObject({
      length: false,
      strength: true,
    });

    expect(mockValidatePassword).toBeCalledWith({ password: emptyValue });
  });

  test("render debounce fire once only", async () => {
    mockValidatePassword.mockResolvedValue({
      ...initialResult,
      strength: true,
    });

    const { rerender, result } = renderHookWithProviders(
      (initialProps) =>
        usePasswordValidator(initialProps.password, {
          validateAsync: mockValidatePassword,
        }),
      {
        initialProps: {
          password: emptyValue,
        },
      }
    );

    await waitFor(() => {
      expect(result.current.isValidating).toBeTruthy();
    });

    act(() => {
      rerender({ password: someStringValue });
    });

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(result.current.isValidating).toBeFalsy();
    });

    expect(result.current.result).toMatchObject({
      length: false,
      strength: true,
    });

    expect(mockValidatePassword).toBeCalledTimes(1);
    expect(mockValidatePassword).toBeCalledWith({ password: someStringValue });
  });

  test("render guard race condition", async () => {
    mockValidatePassword.mockImplementation(async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ...initialResult,
            strength: true,
          });
        }, 10000);
      });
    });

    const { rerender, result } = renderHookWithProviders(
      (initialProps) =>
        usePasswordValidator(initialProps.password, {
          validateAsync: mockValidatePassword,
        }),
      {
        initialProps: {
          password: emptyValue,
        },
      }
    );

    await waitFor(() => {
      expect(result.current.isValidating).toBeTruthy();
    });

    // Advance timer so debounce would fire, but before the promise is resolved.
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    act(() => {
      rerender({ password: someStringValue });
    });

    // Advance timer for the promise to be resolved.
    act(() => {
      jest.advanceTimersByTime(10000);
    });

    await waitFor(() => {
      expect(result.current.isValidating).toBeFalsy();
    });

    expect(result.current.result).toMatchObject({
      length: false,
      strength: false, // race condition handled
    });
  });
});
