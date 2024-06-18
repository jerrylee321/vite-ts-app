import { z } from "zod";

import {
  UserAccountDetails,
  UserAccountDetailsSchema,
} from "./models/UserAccountDetails";

// POST /mpfa/user/{userUuid}
// [FS-UF-MPFA-001-8a] View user account detail.
// API ID: MPFA-BE-ACCESS-F023
// CM: [A19]
// FS: [FS-UF-MPFA-001-8a]
// For MPFA Admin users to view the details of user account

export const UserAccountDetailsRequestSchema = z.undefined();

export type UserAccountDetailsRequest = z.input<
  typeof UserAccountDetailsRequestSchema
>;

export const UserAccountDetailsResponseSchema = z.object({
  success: z.boolean(),
  payload: UserAccountDetailsSchema,
});

export type UserAccountDetailsResponse = z.infer<
  typeof UserAccountDetailsResponseSchema
>;

export type { UserAccountDetails };
