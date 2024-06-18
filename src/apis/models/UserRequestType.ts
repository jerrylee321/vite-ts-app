import { z } from "zod";

export enum UserRequestType {
  addNewUser = "Add New User Account",
  deleteUser = "Delete User Account",
  editUser = "Edit User Account",
  reactivateUser = "Reactivate User",
  resetPassword = "Reset Password",
}

export const UserRequestTypeSchema = z.nativeEnum(UserRequestType);
