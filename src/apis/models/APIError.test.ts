import {
  APIError,
  APIErrorResponseSchema,
  hasErrorCode,
  hasErrorCodes,
  isAPIError,
  isValidationError,
} from "./APIError";

describe("APIError", () => {
  const data = Object.freeze({
    traceId: "trace-id",
    errorCode: "VALIDATION_ERROR",
    errorMessage: {
      en: "EN",
      zhHK: "ZHHK",
      zhCN: "ZHCN",
    },
  });
  const payload = Object.freeze({
    failureCount: 1,
  });

  it("new", () => {
    const err = new APIError(data, payload);
    expect(err.name).toEqual("APIError");
    expect(err.data).toMatchObject(data);
    expect(err.payload).toMatchObject(payload);
  });

  it("fromParsedData", () => {
    const err = APIError.fromParsedData({
      success: false,
      payload,
      error: data,
    });
    expect(err.name).toEqual("APIError");
    expect(err.data).toMatchObject(data);
    expect(err.payload).toMatchObject(payload);
  });

  it("isAPIError should return true", () => {
    expect(isAPIError(new APIError(data, payload))).toEqual(true);
  });

  it("isAPIError should return false for non APIError", () => {
    expect(isAPIError(null)).toEqual(false);
  });

  const err = new APIError(data, payload);
  it("hasErrorCode should return true for VALIDATION_ERROR", () => {
    expect(hasErrorCode(err, "VALIDATION_ERROR")).toEqual(true);
  });

  it("hasErrorCode should return false for UNKNOWN_ERROR", () => {
    expect(hasErrorCode(err, "UNKNOWN_ERROR")).toEqual(false);
  });

  it("hasErrorCodes should return true with a list that contains VALIDATION_ERROR", () => {
    expect(hasErrorCodes(err, ["VALIDATION_ERROR", "UNKNOWN_ERROR"])).toEqual(
      true
    );
  });

  it("hasErrorCodes should return false with a list that does not contain VALIDATION_ERROR", () => {
    expect(hasErrorCodes(err, ["UNKNOWN_ERROR"])).toEqual(false);
  });
});

describe("APIErrorResponseSchema", () => {
  test("VALIDATION_ERROR", () => {
    const error = APIError.fromParsedData(
      APIErrorResponseSchema.parse({
        success: false,
        payload: [
          {
            errorCode: "TR00001",
            message: {
              en: "Field Error",
            },
          },
        ],
        error: {
          traceId: "trace-id",
          errorCode: "VALIDATION_ERROR",
          errorMessage: {
            en: "Validation Error",
          },
        },
      })
    );
    expect(isValidationError(error)).toBeTruthy();
    expect(error.payload).toEqual(
      expect.arrayContaining([
        {
          errorCode: "TR00001",
          message: {
            en: "Field Error",
          },
        },
      ])
    );
  });
});
