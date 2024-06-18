import {
  isAdmin,
  isUserActionable,
  UserAccountDetail,
  UserAccountDetails,
  UserGroup,
} from "./UserAccountDetails";

const mockUserAccountDetail: UserAccountDetail = {
  department: null,
  effectiveDate: null,
  email: null,
  endDate: null,
  officeTelNo: null,
  status: "status",
  suspensionDate: null,
  title: null,
  userGroupUuids: [],
  userId: "",
  userName: null,
  userUuid: "",
  companyName: null,
  role: null,
};

const mockUserGroups: UserGroup[] = [
  {
    userGroupName: "Administration-Preparer",
    userGroupUuid: "uuid1",
    accessRights: [
      {
        schemeUuids: ["schemeUuid1"],
        permissions: [],
      },
    ],
    effectiveDateOfUserGroup: new Date("2023-03-10T00:00:00.000Z"),
  },
  {
    userGroupName: "Administration-Approver",
    userGroupUuid: "uuid2",
    accessRights: [
      {
        schemeUuids: ["schemeUuid2"],
        permissions: [],
      },
    ],
    effectiveDateOfUserGroup: new Date("2023-01-10T00:00:00.000Z"),
  },
  {
    userGroupName: "others",
    userGroupUuid: "uuid3",
    accessRights: [
      {
        schemeUuids: ["schemeUuid3"],
        permissions: [],
      },
    ],
    effectiveDateOfUserGroup: new Date("2023-01-10T00:00:00.000Z"),
  },
];

describe("isAdmin", () => {
  test("should decide if is admin", () => {
    expect(
      isAdmin({
        userAccountDetail: mockUserAccountDetail,
        userGroups: mockUserGroups,
      })
    ).toEqual(false);

    expect(
      isAdmin({
        userAccountDetail: {
          ...mockUserAccountDetail,
          role: "ADMIN_PREPARER",
        },
        userGroups: mockUserGroups,
      })
    ).toEqual(true);
  });
});

describe("isUserActionable", () => {
  test("user is pending or deleted", () => {
    expect(
      isUserActionable({
        userAccountDetail: { status: "PENDING" },
      } as UserAccountDetails)
    ).toBeFalsy();
    expect(
      isUserActionable({
        userAccountDetail: { status: "DELETE" },
      } as UserAccountDetails)
    ).toBeFalsy();
  });

  test("user is active", () => {
    expect(
      isUserActionable({
        userAccountDetail: { status: "ACTIVE" },
      } as UserAccountDetails)
    ).toBeTruthy();
  });
});
