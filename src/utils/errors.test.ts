import { AxiosError } from "axios";

import { APIError } from "../apis/models/APIError";

import { isRetryableError, isUserSessionEndingError } from "./errors";

describe("isUserSessionEndingError", () => {
  test("duplicated session error", () => {
    expect(
      isUserSessionEndingError(
        new APIError({
          errorCode: "DUPLICATE_SESSION",
          traceId: "trace-id",
          errorMessage: { en: "hello" },
        })
      )
    ).toBeTruthy();
  });

  test("resource access denied error", () => {
    expect(
      isUserSessionEndingError(
        new APIError({
          errorCode: "RESOURCE_ACCESS_DENIED",
          traceId: "trace-id",
          errorMessage: { en: "hello" },
        })
      )
    ).toBeFalsy();
  });

  test("401 error", () => {
    expect(
      isUserSessionEndingError(
        new APIError(
          {
            errorCode: "SOME_ERROR",
            traceId: "trace-id",
            errorMessage: { en: "hello" },
          },
          undefined,
          { httpStatus: 401 }
        )
      )
    ).toBeTruthy();
  });

  test("axios 401 error", () => {
    expect(
      isUserSessionEndingError(
        new AxiosError("error message", "error code", undefined, undefined, {
          data: null,
          status: 401,
          statusText: "Unauthorized",
        } as any)
      )
    ).toBeTruthy();
  });

  test("other error", () => {
    expect(
      isUserSessionEndingError(
        new APIError({
          errorCode: "SOME_ERROR",
          traceId: "trace-id",
          errorMessage: { en: "hello" },
        })
      )
    ).toBeFalsy();
  });
});

describe("isRetryableError", () => {
  test("duplicated session error", () => {
    expect(
      isRetryableError(
        new APIError({
          errorCode: "DUPLICATE_SESSION",
          traceId: "trace-id",
          errorMessage: { en: "hello" },
        })
      )
    ).toBeFalsy();
  });

  test("resource access denied error", () => {
    expect(
      isUserSessionEndingError(
        new APIError({
          errorCode: "RESOURCE_ACCESS_DENIED",
          traceId: "trace-id",
          errorMessage: { en: "hello" },
        })
      )
    ).toBeFalsy();
  });

  test("401 error", () => {
    expect(
      isUserSessionEndingError(
        new APIError(
          {
            errorCode: "SOME_ERROR",
            traceId: "trace-id",
            errorMessage: { en: "hello" },
          },
          undefined,
          { httpStatus: 401 }
        )
      )
    ).toBeTruthy();
  });

  test("axios 401 error", () => {
    expect(
      isUserSessionEndingError(
        new AxiosError("error message", "error code", undefined, undefined, {
          data: null,
          status: 401,
          statusText: "Unauthorized",
        } as any)
      )
    ).toBeTruthy();
  });

  test("other error", () => {
    expect(
      isUserSessionEndingError(
        new APIError({
          errorCode: "SOME_ERROR",
          traceId: "trace-id",
          errorMessage: { en: "hello" },
        })
      )
    ).toBeFalsy();
  });
});
