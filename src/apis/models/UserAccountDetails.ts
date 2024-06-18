import { z } from "zod";

import { fallback } from "../../types/Nullable";

import { APIDayFirstDateSchema } from "./APIDate";

export const UserAccountDetailSchema = z.object({
  // NOTE: Not using z.string().uuid() because the format
  // of the ID returned from backend does not match
  // expected UUID regular expression.
  // NOTE: Some of the fields are nullable because the
  // backend may return nulls according to observations.
  userUuid: z.string(),
  userName: z.string().nullable(),
  userId: z.string(),
  status: z.string(),
  department: z.string().nullable(),
  title: z.string().nullable(),
  email: z.string().nullable(),
  officeTelNo: z.string().nullable(),
  effectiveDate: APIDayFirstDateSchema.nullable(),
  endDate: APIDayFirstDateSchema.nullable(),
  suspensionDate: APIDayFirstDateSchema.nullable(),
  userGroupUuids: z
    .array(z.string())
    .nullable()
    .transform((v) => fallback(v, [])),
  companyName: z.string().nullish(),
  role: z.string().nullable(),
});

export type UserAccountDetail = z.infer<typeof UserAccountDetailSchema>;

export const UserPermissionItemSchema = z.object({
  permissionUuid: z.string(),
  roleType: z.string(),
  permitName: z.string(),
  permitNameCode: z.string(),
  preparerFlag: z.boolean().optional(),
});

export type UserPermission = z.infer<typeof UserPermissionItemSchema>;

export const UserPermissionSchema = z.object({
  groupNameCode: z.string(),
  permitGroupName: z.string(),
  permissionsItems: z.array(UserPermissionItemSchema),
});

export const UserAccessRightSchema = z.object({
  schemeUuids: z.array(z.string()),
  permissions: z.array(UserPermissionSchema),
});

export const UserGroupSchema = z.object({
  userGroupUuid: z.string(),
  userGroupName: z.string(),
  effectiveDateOfUserGroup: APIDayFirstDateSchema,
  accessRights: z
    .array(UserAccessRightSchema)
    .nullable()

    .transform((v) => fallback(v, [])),
});

export type UserGroup = z.infer<typeof UserGroupSchema>;

export const UserAccountDetailsSchema = z.object({
  userAccountDetail: UserAccountDetailSchema,
  userGroups: z
    .array(UserGroupSchema)
    .nullable()
    .transform((v) => fallback(v, [])),
});

export type UserAccountDetails = z.infer<typeof UserAccountDetailsSchema>;

export enum APIAdminRole {
  Approver = "ADMIN_APPROVER",
  Preparer = "ADMIN_PREPARER",
}

const apiAdminRoleValues = Object.values(APIAdminRole);

export function deduceAPIAdminRole(role: string): APIAdminRole | null {
  return apiAdminRoleValues.find((v) => v === role) ?? null;
}

export function isAdmin(user: UserAccountDetails): boolean {
  return user.userAccountDetail.role
    ? deduceAPIAdminRole(user.userAccountDetail.role) != null
    : false;
}

export function isUserActionable(user: UserAccountDetails): boolean {
  const { status } = user.userAccountDetail;
  return !["PENDING", "DELETE"].includes(status);
}
