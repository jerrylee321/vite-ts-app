import { z } from "zod";

import Config from "../Config";

import { makeAPISchema } from "./APISchema";

const OrganizationUnitSchema = z.enum(["MPFA", "Trustees"]);
const NotificationTypeSchema = z.enum(["EMAIL"]);
const LocaleSchema = z.enum(["EN"]);

export const RequestOTPRequestSchema = z.object({
  ou: OrganizationUnitSchema,
  notiType: NotificationTypeSchema,
  locale: LocaleSchema,
  email: z.string(),
});

export type RequestOTPRequest = z.infer<typeof RequestOTPRequestSchema>;

export const RequestOTPResponsePayloadSchema = z.object({
  accessToken: z.string(),
  expiresIn: z.number(),
  verCodeId: z.string(), // uuid
});

export type RequestOTPResponsePayload = z.infer<
  typeof RequestOTPResponsePayloadSchema
>;

export const RequestOTPResponseSchema = z.object({
  success: z.boolean(),
  payload: RequestOTPResponsePayloadSchema,
});

export type RequestOTPResponse = z.infer<typeof RequestOTPResponseSchema>;

export const RequestOTPAPISchema = makeAPISchema(
  {
    baseURL: Config.commonAuth.url,
    method: "POST",
    url: "/trusted/forgotpw/public/requestOtp",
  },
  RequestOTPRequestSchema,
  RequestOTPResponseSchema
);

export const ResendOTPRequestSchema = z.object({
  verCodeId: z.string(),
});

export type ResendOTPRequest = z.infer<typeof ResendOTPRequestSchema>;

export const SuccessResponseSchema = z.object({
  success: z.boolean(),
  code: z.number(),
  payload: z.object({
    code: z.string(),
    message: z.object({
      en: z.string(),
      zhHK: z.string(),
      zhCN: z.string(),
    }),
    submitTime: z.string().datetime({ offset: true }),
  }),
});

export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;

export const ResendOTPAPISchema = makeAPISchema(
  {
    baseURL: Config.commonAuth.url,
    method: "POST",
    url: "/trusted/forgotpw/resendOtp",
  },
  ResendOTPRequestSchema,
  SuccessResponseSchema
);

export const VerifyOTPRequestSchema = z.object({
  verCodeId: z.string(),
  otp: z.string(),
  ou: OrganizationUnitSchema,
  notiType: NotificationTypeSchema,
  email: z.string(),
});

export type VerifyOTPRequest = z.infer<typeof VerifyOTPRequestSchema>;

export const VerifyOTPAPISchema = makeAPISchema(
  {
    baseURL: Config.commonAuth.url,
    method: "POST",
    url: "/trusted/forgotpw/verifyOtp",
  },
  VerifyOTPRequestSchema,
  SuccessResponseSchema
);

export const ResetPasswordRequestSchema = z.object({
  verCodeId: z.string(),
  ou: OrganizationUnitSchema,
  notiType: NotificationTypeSchema,
  email: z.string(),
  newPassword: z.string(),
  locale: LocaleSchema,
});

export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;

export const ResetPasswordAPISchema = makeAPISchema(
  {
    baseURL: Config.commonAuth.url,
    method: "POST",
    url: "/trusted/forgotpw/resetPassword",
  },
  ResetPasswordRequestSchema,
  SuccessResponseSchema
);

export const ChangePasswordRequestSchema = z.object({
  ou: OrganizationUnitSchema,
  locale: LocaleSchema,
  password: z.string(),
  newPassword: z.string(),
});

export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>;

export const ChangePasswordAPISchema = makeAPISchema(
  {
    baseURL: Config.commonAuth.url,
    method: "POST",
    url: "/trusted/user/changePassword",
  },
  ChangePasswordRequestSchema,
  SuccessResponseSchema
);

export const ValidatePasswordRequestSchema = z.object({
  password: z.string(),
});

export type ValidatePasswordRequest = z.infer<
  typeof ValidatePasswordRequestSchema
>;

export const ValidatePasswordResponseSchema = z.object({
  success: z.boolean(),
  payload: z
    .object({
      strengthCheck: z.boolean(),
      lengthCheck: z.boolean(),
      usernameCheck: z.boolean(),
      uppercaseCheck: z.boolean(),
      lowercaseCheck: z.boolean(),
      numericCheck: z.boolean(),
      specialcharCheck: z.boolean(),
    })
    .transform(
      ({
        strengthCheck: strength,
        lengthCheck: length,
        usernameCheck: username,
        uppercaseCheck: uppercase,
        lowercaseCheck: lowercase,
        numericCheck: numeric,
        specialcharCheck: specialCharacters,
      }) => ({
        strength,
        length,
        username,
        uppercase,
        lowercase,
        numeric,
        specialCharacters,
      })
    ),
});

export type ValidatePasswordResponse = z.infer<
  typeof ValidatePasswordResponseSchema
>;

export type ValidatePasswordResult = ValidatePasswordResponse["payload"];
