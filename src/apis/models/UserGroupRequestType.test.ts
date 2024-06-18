import {
  UserGroupRequestType,
  UserGroupRequestTypeSchema,
} from "./UserGroupRequestType";

test("AccessRightRole Schema", () => {
  expect(UserGroupRequestTypeSchema.parse("Add New User Group")).toEqual(
    UserGroupRequestType.addNewUserGroup
  );
  expect(UserGroupRequestTypeSchema.parse("Edit User Group")).toEqual(
    UserGroupRequestType.editUserGroup
  );
  expect(UserGroupRequestTypeSchema.parse("Delete User Group")).toEqual(
    UserGroupRequestType.deleteUserGroup
  );
});
