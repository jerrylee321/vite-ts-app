import { z } from "zod";

export enum AccessRightRoleType {
  preparer = "Preparer",
  supervisor = "Supervisor",
  enquirer = "Enquirer",
}

export const AccessRightRoleSchema = z.nativeEnum(AccessRightRoleType);
