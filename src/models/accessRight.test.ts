import { fromUserPermission } from "./accessRight";

test("fromUserPermission", () => {
  expect(
    fromUserPermission(
      {
        permissionUuid: "uuid",
        permitName: "name",
        permitNameCode: "code",
        roleType: "role",
        preparerFlag: true,
      },
      "group name",
      "group name code"
    )
  ).toEqual({
    permissionUuid: "uuid",
    moduleName: "name",
    permitNameCode: "code",
    roleType: "role",
    groupName: "group name",
    groupNameCode: "group name code",
    preparerFlag: true,
  });
});
