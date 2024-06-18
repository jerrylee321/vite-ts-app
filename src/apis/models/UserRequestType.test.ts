import { UserRequestType, UserRequestTypeSchema } from "./UserRequestType";

test("AccessRightRole Schema", () => {
  expect(UserRequestTypeSchema.parse("Add New User Account")).toEqual(
    UserRequestType.addNewUser
  );
  expect(UserRequestTypeSchema.parse("Delete User Account")).toEqual(
    UserRequestType.deleteUser
  );
  expect(UserRequestTypeSchema.parse("Edit User Account")).toEqual(
    UserRequestType.editUser
  );
  expect(UserRequestTypeSchema.parse("Reactivate User")).toEqual(
    UserRequestType.reactivateUser
  );
  expect(UserRequestTypeSchema.parse("Reset Password")).toEqual(
    UserRequestType.resetPassword
  );
});
