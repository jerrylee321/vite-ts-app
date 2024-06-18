import {
  AccessRightRoleSchema,
  AccessRightRoleType,
} from "./AccessRightRoleType";

test("AccessRightRole Schema", () => {
  expect(AccessRightRoleSchema.parse("Preparer")).toEqual(
    AccessRightRoleType.preparer
  );
  expect(AccessRightRoleSchema.parse("Supervisor")).toEqual(
    AccessRightRoleType.supervisor
  );
  expect(AccessRightRoleSchema.parse("Enquirer")).toEqual(
    AccessRightRoleType.enquirer
  );
});
