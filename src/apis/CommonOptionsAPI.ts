import { z } from "zod";

import Config from "../Config";

import { CommonOptionsSchema } from "./models/CommonScheme";
import { makeAPISchema } from "./APISchema";

// Swagger document does not exists for this API.
// See https://jira.devops.nonprod.empf.local/jira/browse/EM-5609 for
// authoritative list.

const CommonOptionsTypeSchema = z.enum([
  "cmn_scheme",
  "cmn_trustee",
  "holdUpReminderNotifyType",
  "holdUpReminderTargetType",
  "optMemberType",
  "optNotifyType",
  "parReturnType",
  "paymentNoticeType",
  "pdActionType",
  "replyFlag",
  "reportVersion",
  "requestPriority",
  "requestStatus",
  "requestTarget",
  "requestType",
  "returnType",
  "statReturnType",
  "surchObjSource",
  "uamADUserStatus",
  "uamMaintType",
  "uamMpfaDeptName",
  "uamRequestStatus",
  "uamRequestTypeUserAccount",
  "uamRequestTypeUserGroup",
  "uamUserGroupStatus",
  "uamUserStatus",
  "uam_mpfa.request_type",
]);

export type CommonOptionsType = z.infer<typeof CommonOptionsTypeSchema>;

export const CommonOptionsRequestSchema = z.object({
  type: CommonOptionsTypeSchema,
});

export type CommonOptionsRequest = z.input<typeof CommonOptionsRequestSchema>;

export const CommonOptionsResponseSchema = z.object({
  success: z.boolean(),
  payload: z.record(z.array(CommonOptionsSchema)),
});

export type CommonOptionsResponse = z.infer<typeof CommonOptionsResponseSchema>;

export const CommonOptionsAPISchema = makeAPISchema(
  {
    baseURL: Config.commonOptionsApiBaseUrl,
    method: "GET",
    url: "",
  },
  CommonOptionsRequestSchema,
  CommonOptionsResponseSchema
);
