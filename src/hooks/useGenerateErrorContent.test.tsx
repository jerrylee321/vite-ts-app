import { JSXElementConstructor, ReactElement } from "react";
import { I18nextProvider } from "react-i18next";
import { renderHook } from "@testing-library/react";
import { AxiosError } from "axios";
import { ZodError } from "zod";

import { APIError } from "../apis/models/APIError";
import i18n from "../i18n";
import { AuthError, CustomError, LocalizableError } from "../models/errors";

import useGenerateErrorContent from "./useGenerateErrorContent";

const wrapper: JSXElementConstructor<{
  children: ReactElement;
}> = ({ children }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

jest.mock("../Config", () => {
  return {
    __esModule: true,
    default: {
      ...jest.requireActual("../Config").default,
      uamApiBaseUrl: "https://uam.com",
      fileUploadApiBaseUrl: "https://fileUpload.com",
      commonOptionsApiBaseUrl: "https://commonOptions.com",
    },
  };
});

describe("useGenerateErrorContent", () => {
  const { result } = renderHook(() => useGenerateErrorContent(), {
    wrapper,
  });
  const generateErrorContent = result.current;

  test("generate content with generic error code", () => {
    const { title, message, traceId } = generateErrorContent(
      APIError.fromParsedData({
        success: false,
        payload: null,
        error: {
          traceId: "TRACE_ID",
          errorCode: "GENERIC_ERROR",
          errorMessage: { en: "Error Message" } as any,
        },
      })
    );
    expect(title).toEqual("GENERIC_ERROR");
    expect(message).toEqual(expect.stringContaining("Error Message"));
    expect(traceId).toEqual(expect.stringContaining("TRACE_ID"));
  });

  test("generate content with generic error code, but with error code hidden", () => {
    const { title, traceId } = generateErrorContent(
      APIError.fromParsedData({
        success: false,
        payload: null,
        error: {
          traceId: "TRACE_ID",
          errorCode: "GENERIC_ERROR",
          errorMessage: { en: "Error Message" } as any,
        },
      }),
      { hideErrorCode: true }
    );
    expect(title).toEqual("Error Message");
    expect(traceId).not.toEqual(expect.stringContaining("TRACE_ID"));
  });

  test("generate content with duplicate session code", () => {
    expect(
      generateErrorContent(
        APIError.fromParsedData({
          success: false,
          payload: null,
          error: {
            traceId: "",
            errorCode: "DUPLICATE_SESSION",
            errorMessage: {} as any,
          },
        })
      )
    ).toMatchObject({
      title: expect.stringMatching("We need to end this session"),
    });
  });

  test("generate content with 401 http status", () => {
    expect(
      generateErrorContent(
        APIError.fromParsedData(
          {
            success: false,
            payload: null,
            error: {
              traceId: "",
              errorCode: "",
              errorMessage: {} as any,
            },
          },
          { httpStatus: 401 }
        )
      )
    ).toMatchObject({
      title: expect.stringMatching("Unauthorized"),
      message: expect.stringMatching("Please login to continue"),
    });
  });

  test("generate content with zod error", () => {
    expect(generateErrorContent(new ZodError([]))).toEqual({
      title: "Schema Error",
      message: "Error parsing API request or response.",
    });
  });

  test("generate content with axios error", () => {
    const error1 = new AxiosError();
    error1.response = {
      status: 400,
      statusText: "400 Bad Request",
    } as any;
    error1.message = "Error Message";
    expect(generateErrorContent(error1)).toEqual({
      title: "400 Bad Request",
      message: "Error Message",
    });

    const error2 = new AxiosError();
    expect(generateErrorContent(error2)).toMatchObject({
      title: "Request failed",
    });
  });

  test("generate content with axios error with request context", () => {
    const error1 = new AxiosError();
    error1.response = {
      status: 400,
      statusText: "400 Bad Request",
    } as any;
    error1.message = "Error Message";
    (error1 as any).apiRequestContext = {
      method: "POST",
      baseURL: "https://uam.com", // mocked config above
      url: "/test",
    };
    expect(generateErrorContent(error1)).toEqual({
      title: "400 Bad Request",
      message: "Error Message\nAPI: UAM",
    });

    const error2 = new AxiosError();
    error2.response = {
      status: 400,
      statusText: "400 Bad Request",
    } as any;
    error2.message = "Error Message";
    (error2 as any).apiRequestContext = {
      method: "POST",
      baseURL: "https://fileUpload.com", // mocked config above
      url: "/test",
    };
    expect(generateErrorContent(error2)).toEqual({
      title: "400 Bad Request",
      message: "Error Message\nAPI: File Upload",
    });

    const error3 = new AxiosError();
    error3.response = {
      status: 400,
      statusText: "400 Bad Request",
    } as any;
    error3.message = "Error Message";
    (error3 as any).apiRequestContext = {
      method: "POST",
      baseURL: "https://commonOptions.com", // mocked config above
      url: "/test",
    };
    expect(generateErrorContent(error3)).toEqual({
      title: "400 Bad Request",
      message: "Error Message\nAPI: Common Options",
    });

    const error4 = new AxiosError();
    error4.response = {
      status: 400,
      statusText: "400 Bad Request",
    } as any;
    error4.message = "Error Message";
    (error4 as any).apiRequestContext = {
      method: "POST",
      baseURL: "https://test.com/v1",
      url: "/test",
    };
    expect(generateErrorContent(error4)).toEqual({
      title: "400 Bad Request",
      message: "Error Message\nAPI: https://test.com/v1",
    });
  });

  test("generate content with 401 axios error", () => {
    const error = new AxiosError();
    error.response = { status: 401 } as any;
    expect(generateErrorContent(error)).toEqual({
      title: expect.stringContaining("Unauthorized"),
      message: expect.stringContaining("Please login to continue."),
    });
  });

  test("generate content with auth error", () => {
    expect(generateErrorContent(new AuthError("Error Message"))).toEqual({
      title: "Authentication Error",
      message: expect.stringContaining("system administrator"),
    });
  });

  test("generate content with custom error", () => {
    expect(
      generateErrorContent(
        new CustomError("Error Message", { title: "Error Title" })
      )
    ).toEqual({ title: "Error Title", message: "Error Message" });
  });

  test("generate content with custom error without title", () => {
    expect(generateErrorContent(new CustomError("Error Message"))).toEqual({
      title: "Error",
      message: "Error Message",
    });
  });

  test("generate content with localizable error", () => {
    expect(
      generateErrorContent(
        new LocalizableError("UploadFilePicker.error.tooManyFiles", {
          messageArgs: { maxFiles: 3 },
          titleMessageKey: "Common.form.validationError.mixed.default.hkid",
          titleMessageArgs: { label: "My label" },
        })
      )
    ).toEqual({
      title: "My label is not a valid HKID",
      message: "Too many files: maximum count is 3",
    });
  });

  test("generate content with localizable error without title", () => {
    expect(
      generateErrorContent(
        new LocalizableError("UploadFilePicker.error.tooManyFiles", {
          messageArgs: { maxFiles: 4 },
        })
      )
    ).toEqual({
      title: "Error",
      message: "Too many files: maximum count is 4",
    });
  });

  test("generate content with string error", () => {
    expect(generateErrorContent("hello world")).toEqual({
      title: "Error",
      message: "hello world",
    });
  });

  test("generate content for other error", () => {
    expect(generateErrorContent(new Error())).toEqual({
      title: "Unexpected Error",
      message: expect.stringContaining("System error"),
    });
  });

  test("generate content for validation error", () => {
    expect(
      generateErrorContent(
        APIError.fromParsedData({
          success: false,
          payload: [
            {
              errorCode: "VALIDATION_ERROR",
              message: { en: "Field required" },
            },
          ],
          error: {
            traceId: "TRACE_ID",
            errorCode: "VALIDATION_ERROR",
            errorMessage: { en: "Error Message" },
          },
        })
      )
    ).toMatchObject({
      title: "VALIDATION_ERROR",
      message: expect.stringContaining("Error Message"),
      itemized: ["Field required"],
    });
  });
});
