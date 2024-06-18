import { z } from "zod";

export enum UserGroupRequestType {
  addNewUserGroup = "Add New User Group",
  editUserGroup = "Edit User Group",
  deleteUserGroup = "Delete User Group",
}

export const UserGroupRequestTypeSchema = z.nativeEnum(UserGroupRequestType);
