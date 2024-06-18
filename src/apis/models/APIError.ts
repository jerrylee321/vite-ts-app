import { z } from "zod";

import { fallback } from "../../types/Nullable";

import { APII18nMessageSchema } from "./APII18nMessage";

// NOTE: This is not intended as an authoritative list. But error code that
// is referenced at multiple locations should be added here.
export enum APIErrorCode {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  DUPLICATE_SESSION = "DUPLICATE_SESSION",
  RESOURCE_ACCESS_DENIED = "RESOURCE_ACCESS_DENIED",
  BAD_CREDENTIAL = "BAD_CREDENTIAL",
  CAU0007 = "CAU0007", // Change Password Account Locked Error
}

export interface IAPIErrorData {
  traceId: string;
  errorCode: string;
  errorMessage: z.infer<typeof APII18nMessageSchema>;
}

function makeAPIErrorDataFromMessage(message: string): IAPIErrorData {
  return {
    traceId: "",
    errorCode: "",
    errorMessage: {
      en: message,
      zhHK: message,
      zhCN: message,
    },
  };
}

export interface IAPIErrorResponse<Payload> {
  success: boolean;
  payload?: Payload;
  error: IAPIErrorData;
}

export interface IAPIErrorInfo {
  httpStatus?: number;
}

export class APIError<Payload = null> extends Error {
  public readonly data: Readonly<IAPIErrorData>;
  public readonly payload: Readonly<Payload | null>;
  public readonly info?: IAPIErrorInfo;
  constructor(data: IAPIErrorData, payload?: Payload, info?: IAPIErrorInfo) {
    super(data.errorCode);
    this.name = "APIError";
    this.data = Object.freeze(data);
    this.payload = Object.freeze(payload ?? null);
    if (info) {
      this.info = Object.freeze(info);
    }
    Object.setPrototypeOf(this, APIError.prototype);
  }

  public static fromParsedData<Payload = null>(
    data: IAPIErrorResponse<Payload>,
    info?: IAPIErrorInfo
  ): APIError<Payload> {
    return new APIError(data.error, data.payload, info);
  }
}

export const makeAPIErrorDataSchema = (
  code: string | z.ZodType<string, any, any>
): z.ZodType<IAPIErrorData, any, any> => {
  return z.union([
    z.object({
      traceId: z.string(),
      errorCode: typeof code === "string" ? z.literal(code) : code,
      errorMessage: APII18nMessageSchema,
    }),
    z
      .object({
        error_description: z.string(),
      })
      .transform(({ error_description }) =>
        makeAPIErrorDataFromMessage(error_description)
      ),
    z
      .string()
      .nullable()
      .transform((maybeMessage) => fallback(maybeMessage, ""))
      .transform(makeAPIErrorDataFromMessage),
  ]);
};

export const ValidationErrorPayloadSchema = z
  .array(
    z.object({
      errorCode: z.string(),
      message: APII18nMessageSchema,
    })
  )
  .nullish();

export type ValidationErrorPayload = z.infer<
  typeof ValidationErrorPayloadSchema
>;

export const ValidationErrorResponseSchema = z.object({
  success: z.literal(false),
  payload: ValidationErrorPayloadSchema,
  error: makeAPIErrorDataSchema("VALIDATION_ERROR"),
});

export const GenericAPIErrorResponseSchema = z.object({
  success: z.boolean().optional().default(false),
  // To get the error payload, define a custom error response with a specific
  // error code.
  payload: z
    .unknown()
    .nullish()
    .transform(() => null),
  error: makeAPIErrorDataSchema(z.string()),
});

export const APIErrorResponseSchema = z.union([
  ValidationErrorResponseSchema,
  // The generic error response should be the last.
  GenericAPIErrorResponseSchema,
]);

export type APIErrorResponse = z.infer<typeof APIErrorResponseSchema>;

export const isAPIError = (err: unknown): err is APIError => {
  return err instanceof APIError;
};

export const hasErrorCode = <Payload>(
  err: unknown,
  errorCode: string
): err is APIError<Payload> => {
  return err instanceof APIError && err.data.errorCode === errorCode;
};

export const hasErrorCodes = <Payload>(
  err: unknown,
  errorCode: string[]
): err is APIError<Payload> => {
  return err instanceof APIError && errorCode.includes(err.data.errorCode);
};

export const isValidationError = (
  err: unknown
): err is APIError<ValidationErrorPayload> => {
  return hasErrorCode(err, APIErrorCode.VALIDATION_ERROR);
};
