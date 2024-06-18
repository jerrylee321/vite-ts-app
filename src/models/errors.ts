import { MessageKey } from "../i18n/LocaleModel";

export interface CustomErrorOptions {
  title: string;
}
export class CustomError extends Error {
  public readonly options: Readonly<CustomErrorOptions | undefined>;
  constructor(message: string, options?: CustomErrorOptions) {
    super(message);
    this.name = "APIError";
    this.options = options;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export class AuthError extends Error {
  public readonly options: Readonly<CustomErrorOptions | undefined>;
  constructor(message: string, options?: CustomErrorOptions) {
    super(message);
    this.name = "AuthError";
    this.options = options;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const isAuthError = (err: unknown): err is AuthError => {
  return err instanceof Error && err.name === "AuthError";
};

export class ErrorWithAPIRequestContext extends Error {
  public readonly apiRequestContext!: {
    method?: string;
    baseURL?: string;
    url?: string;
  };
}

export const isErrorWithAPIRequestContext = (
  err: unknown
): err is ErrorWithAPIRequestContext => {
  return err instanceof Error && (err as any).apiRequestContext != null;
};

interface LocalizableErrorOptions {
  messageArgs?: Record<string, unknown>;
  titleMessageKey?: MessageKey;
  titleMessageArgs?: Record<string, unknown>;
}

export class LocalizableError extends Error {
  public readonly messageMessageKey: MessageKey;
  public readonly options: Readonly<LocalizableErrorOptions | undefined>;
  constructor(message: MessageKey, options?: LocalizableErrorOptions) {
    super(message);
    this.name = "LocalizableError";
    this.messageMessageKey = message;
    this.options = options;
    Object.setPrototypeOf(this, LocalizableError.prototype);
  }
}

export class CaptchaError extends Error {
  public readonly options: Readonly<CustomErrorOptions | undefined>;
  constructor(message: string, options?: CustomErrorOptions) {
    super(message);
    this.name = "CaptchaError";
    this.options = options;
    Object.setPrototypeOf(this, CaptchaError.prototype);
  }
}

export const isCaptchaError = (err: unknown): err is CaptchaError => {
  return err instanceof Error && err.name === "CaptchaError";
};
