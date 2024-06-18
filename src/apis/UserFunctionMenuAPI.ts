import { makeAPISchema } from "frontend-common/src/apis/APISchema";
import z from "zod";

import Config from "../Config";

import { UserFunctionMenuItemSchema } from "./models/UserFunctionMenu";

export const UserFunctionMenuRequestSchema = z.object({
  platform: z.enum(["MPFA", "TR", "ORSO"]),
  schemeUuid: z.string().optional(),
  categoryList: z.array(z.string()).optional(),
});

export type UserFunctionMenuRequest = z.infer<
  typeof UserFunctionMenuRequestSchema
>;

export const UserFunctionMenuResponseSchema = z.object({
  payload: z.array(UserFunctionMenuItemSchema),
});

export type UserFunctionMenuResponse = z.infer<
  typeof UserFunctionMenuResponseSchema
>;

export const UserFunctionMenuAPISchema = makeAPISchema(
  {
    baseURL: Config.uamApiBaseUrl,
    method: "POST",
    url: "/permissions/userFunctionMenu",
  },
  UserFunctionMenuRequestSchema,
  UserFunctionMenuResponseSchema
);
