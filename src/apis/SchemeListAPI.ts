import { z } from "zod";

import Config from "../Config";
import { PortalType } from "../types/Portal";

import { SchemeListSchemeSchema } from "./models/SchemeList";
import APISchema, { makeAPISchema } from "./APISchema";

export const SchemeListRequestSchema = z.undefined();

export type SchemeListRequest = z.input<typeof SchemeListRequestSchema>;

export const SchemeListResponseSchema = z.object({
  success: z.boolean(),
  payload: z.array(SchemeListSchemeSchema),
});

export type SchemeListResponse = z.infer<typeof SchemeListResponseSchema>;

export const schemeListAPIPathWithUserId = (
  userId: string,
  portal: PortalType
): string => {
  return `/${portal}/user/${userId}/schemeList`;
};

/**
 * API ID (Trustee): UAM-TR-QUERY-MPF-SCHEME-LIST
 */
export const makeSchemeListAPISchema = (
  userId: string,
  portal: PortalType
): APISchema<SchemeListRequest, SchemeListResponse> =>
  makeAPISchema(
    {
      baseURL: Config.uamApiBaseUrl,
      method: "GET",
      url: schemeListAPIPathWithUserId(userId, portal),
    },
    SchemeListRequestSchema,
    SchemeListResponseSchema
  );
