import { APIAdminRole, UserGroup } from "../apis/models/UserAccountDetails";
import {
  DUMMY_SCHEME_UUID,
  dummyAdminApproverUserGroups,
  dummyAdminPreparerUserGroups,
} from "../constants/dummyUserGroup";
import { DummyGroupNameCode } from "../constants/groupNameCode";
import { DummyPermitNameCode } from "../constants/permitNameCode";
import { MessageKey } from "../i18n/LocaleModel";
import { Module } from "../models/module";
import { RouteMenuItem } from "../models/route";
import { WithUserFunctionMenuFilter } from "../models/userFunctionMenu";

import {
  canAccess,
  deduceAdminRole,
  filterModulesWithUserGroupsAndScheme,
  filterPageWithUserFunctionMenu,
  filterRouteMenuWithUserGroupsAndScheme,
  getUserGroupsBySchemeUuid,
  IS_ROLE_IGNORED,
  makeGrantedPermissionsFromUserGroups,
} from "./permission";

describe("filterRouteMenuWithUserGroupWithScheme", () => {
  test("should filter menu", () => {
    const routeMenu: RouteMenuItem[] = [
      {
        labelMessageKey: "NoGroupNameCode" as MessageKey,
      },
      {
        labelMessageKey: "GroupNameWithNoChildren" as MessageKey,
        groupNameCode: "group1",
      },
      {
        labelMessageKey: "GroupNameWithEmptyChildren" as MessageKey,
        groupNameCode: "group2",
        children: [],
      },
      {
        labelMessageKey: "GroupNameWithChildren" as MessageKey,
        groupNameCode: "group3",
        children: [
          {
            labelMessageKey: "Children1" as MessageKey,
            permitNameCode: "c1",
          },
          {
            labelMessageKey: "Children2" as MessageKey,
            permitNameCode: "c2",
          },
          {
            labelMessageKey: "Children3" as MessageKey,
          },
        ],
      },
    ];

    const userGroups: UserGroup[] = [
      {
        accessRights: [
          {
            permissions: [
              {
                groupNameCode: "group1",
                permissionsItems: [
                  {
                    permissionUuid: "uuid",
                    permitName: "Name",
                    permitNameCode: "group1",
                    roleType: "Role",
                    preparerFlag: false,
                  },
                ],
                permitGroupName: "Group 1",
              },
            ],
            schemeUuids: ["uuid1"],
          },
          {
            permissions: [
              {
                groupNameCode: "group2",
                permissionsItems: [
                  {
                    permissionUuid: "uuid",
                    permitName: "Name",
                    permitNameCode: "group2",
                    roleType: "Role",
                    preparerFlag: false,
                  },
                ],
                permitGroupName: "Group 2",
              },
            ],
            schemeUuids: ["uuid2"],
          },
          {
            permissions: [
              {
                groupNameCode: "group3",
                permissionsItems: [
                  {
                    permissionUuid: "uuid",
                    permitName: "Name",
                    permitNameCode: "c1",
                    roleType: "Role",
                    preparerFlag: false,
                  },
                ],
                permitGroupName: "Group 3",
              },
            ],
            schemeUuids: ["uuid1"],
          },
          {
            permissions: [
              {
                groupNameCode: "group3",
                permissionsItems: [
                  {
                    permissionUuid: "uuid",
                    permitName: "Name",
                    permitNameCode: "c2",
                    roleType: "Role",
                    preparerFlag: false,
                  },
                ],
                permitGroupName: "Group 3",
              },
            ],
            schemeUuids: ["uuid2"],
          },
        ],
        effectiveDateOfUserGroup: new Date("2023-03-10T00:00:00.000Z"),
        userGroupName: "group1",
        userGroupUuid: "group1",
      },
    ];

    expect(
      filterRouteMenuWithUserGroupsAndScheme(
        routeMenu,
        userGroups,
        "uuid1",
        new Date("2023-04-10T00:00:00.000Z")
      )
    ).toEqual([
      {
        labelMessageKey: "NoGroupNameCode",
      },
      {
        labelMessageKey: "GroupNameWithNoChildren",
        groupNameCode: "group1",
      },
      // group2 filtered
      {
        labelMessageKey: "GroupNameWithChildren",
        groupNameCode: "group3",
        children: [
          {
            labelMessageKey: "Children1",
            permitNameCode: "c1",
          },
          // c2 filtered
          {
            labelMessageKey: "Children3",
          },
        ],
      },
    ]);

    expect(
      filterRouteMenuWithUserGroupsAndScheme(
        routeMenu,
        userGroups,
        "uuid2",
        new Date("2023-04-10T00:00:00.000Z")
      )
    ).toEqual([
      {
        labelMessageKey: "NoGroupNameCode",
      },
      // group1 filtered
      {
        labelMessageKey: "GroupNameWithEmptyChildren",
        groupNameCode: "group2",
        children: [],
      },
      {
        labelMessageKey: "GroupNameWithChildren",
        groupNameCode: "group3",
        children: [
          // c1 filtered
          {
            labelMessageKey: "Children2",
            permitNameCode: "c2",
          },
          {
            labelMessageKey: "Children3",
          },
        ],
      },
    ]);

    expect(
      filterRouteMenuWithUserGroupsAndScheme(
        routeMenu,
        userGroups,
        "uuid2",
        new Date("2023-01-10T00:00:00.000Z")
      )
    ).toEqual([
      {
        labelMessageKey: "NoGroupNameCode",
      },
    ]);
  });
});

describe("filterRouteMenuWithUserGroupWithScheme", () => {
  test("should filter menu", () => {
    const modules: Module[] = [
      {
        messageKey: "NoGroupNameCode" as MessageKey,
      },
      {
        messageKey: "GroupNameWithNoChildren" as MessageKey,
        groupNameCode: "group1",
      },
      {
        messageKey: "GroupNameWithEmptyChildren" as MessageKey,
        groupNameCode: "group2",
        submodules: [],
      },
      {
        messageKey: "GroupNameWithChildren" as MessageKey,
        groupNameCode: "group3",
        submodules: [
          {
            messageKey: "Children1" as MessageKey,
            permitNameCode: "c1",
          },
          {
            messageKey: "Children2" as MessageKey,
            permitNameCode: "c2",
          },
          {
            messageKey: "Children3" as MessageKey,
          },
        ],
      },
    ];

    const userGroups: UserGroup[] = [
      {
        accessRights: [
          {
            permissions: [
              {
                groupNameCode: "group1",
                permissionsItems: [
                  {
                    permissionUuid: "uuid",
                    permitName: "Name",
                    permitNameCode: "group1",
                    roleType: "Role",
                    preparerFlag: false,
                  },
                ],
                permitGroupName: "Group 1",
              },
            ],
            schemeUuids: ["uuid1"],
          },
          {
            permissions: [
              {
                groupNameCode: "group2",
                permissionsItems: [
                  {
                    permissionUuid: "uuid",
                    permitName: "Name",
                    permitNameCode: "group2",
                    roleType: "Role",
                    preparerFlag: false,
                  },
                ],
                permitGroupName: "Group 2",
              },
            ],
            schemeUuids: ["uuid2"],
          },
          {
            permissions: [
              {
                groupNameCode: "group3",
                permissionsItems: [
                  {
                    permissionUuid: "uuid",
                    permitName: "Name",
                    permitNameCode: "c1",
                    roleType: "Role",
                    preparerFlag: false,
                  },
                ],
                permitGroupName: "Group 3",
              },
            ],
            schemeUuids: ["uuid1"],
          },
          {
            permissions: [
              {
                groupNameCode: "group3",
                permissionsItems: [
                  {
                    permissionUuid: "uuid",
                    permitName: "Name",
                    permitNameCode: "c2",
                    roleType: "Role",
                    preparerFlag: false,
                  },
                ],
                permitGroupName: "Group 3",
              },
            ],
            schemeUuids: ["uuid2"],
          },
        ],
        effectiveDateOfUserGroup: new Date("2023-03-10T00:00:00.000Z"),
        userGroupName: "group1",
        userGroupUuid: "group1",
      },
    ];

    expect(
      filterModulesWithUserGroupsAndScheme(
        modules,
        userGroups,
        "uuid1",
        new Date("2023-04-10T00:00:00.000Z")
      )
    ).toEqual([
      {
        messageKey: "NoGroupNameCode",
      },
      {
        messageKey: "GroupNameWithNoChildren",
        groupNameCode: "group1",
      },
      // group2 filtered
      {
        messageKey: "GroupNameWithChildren",
        groupNameCode: "group3",
        submodules: [
          {
            messageKey: "Children1",
            permitNameCode: "c1",
          },
          // c2 filtered
          {
            messageKey: "Children3",
          },
        ],
      },
    ]);

    expect(
      filterModulesWithUserGroupsAndScheme(
        modules,
        userGroups,
        "uuid2",
        new Date("2023-04-10T00:00:00.000Z")
      )
    ).toEqual([
      {
        messageKey: "NoGroupNameCode",
      },
      // group1 filtered
      {
        messageKey: "GroupNameWithEmptyChildren",
        groupNameCode: "group2",
        submodules: [],
      },
      {
        messageKey: "GroupNameWithChildren",
        groupNameCode: "group3",
        submodules: [
          // c1 filtered
          {
            messageKey: "Children2",
            permitNameCode: "c2",
          },
          {
            messageKey: "Children3",
          },
        ],
      },
    ]);

    expect(
      filterModulesWithUserGroupsAndScheme(
        modules,
        userGroups,
        "uuid2",
        new Date("2023-01-10T00:00:00.000Z")
      )
    ).toEqual([
      {
        messageKey: "NoGroupNameCode",
      },
    ]);
  });
});

describe("getUserGroupsBySchemeUuid", () => {
  test("should get user groups by scheme uuid", () => {
    const uuid11 = {
      accessRights: [
        {
          permissions: [
            {
              groupNameCode: "group1",
              permissionsItems: [
                {
                  permissionUuid: "uuid",
                  permitName: "Name",
                  permitNameCode: "group1",
                  roleType: "Role",
                  preparerFlag: false,
                },
              ],
              permitGroupName: "Group 1",
            },
          ],
          schemeUuids: ["uuid1"],
        },
      ],
      effectiveDateOfUserGroup: new Date("2023-03-10T00:00:00.000Z"),
      userGroupName: "group1",
      userGroupUuid: "group1",
    };

    const uuid12 = {
      accessRights: [
        {
          permissions: [
            {
              groupNameCode: "group1",
              permissionsItems: [
                {
                  permissionUuid: "uuid",
                  permitName: "Name",
                  permitNameCode: "group1",
                  roleType: "Role",
                  preparerFlag: false,
                },
              ],
              permitGroupName: "Group 1",
            },
          ],
          schemeUuids: ["uuid1"],
        },
      ],
      effectiveDateOfUserGroup: new Date("2023-05-10T00:00:00.000Z"),
      userGroupName: "group1",
      userGroupUuid: "group1",
    };

    const uuid21 = {
      accessRights: [
        {
          permissions: [
            {
              groupNameCode: "group2",
              permissionsItems: [
                {
                  permissionUuid: "uuid",
                  permitName: "Name",
                  permitNameCode: "group2",
                  roleType: "Role",
                  preparerFlag: false,
                },
              ],
              permitGroupName: "Group 2",
            },
          ],
          schemeUuids: ["uuid2"],
        },
      ],
      effectiveDateOfUserGroup: new Date("2023-03-10T00:00:00.000Z"),
      userGroupName: "group2",
      userGroupUuid: "group2",
    };

    const userGroups: UserGroup[] = [uuid11, uuid21, uuid12];

    expect(
      getUserGroupsBySchemeUuid(
        userGroups,
        "uuid1",
        new Date("2023-04-10T00:00:00.000Z")
      )
    ).toEqual([uuid11]);
    expect(
      getUserGroupsBySchemeUuid(
        userGroups,
        "uuid2",
        new Date("2023-04-10T00:00:00.000Z")
      )
    ).toEqual([uuid21]);
    expect(
      getUserGroupsBySchemeUuid(
        userGroups,
        "uuid1",
        new Date("2023-06-10T00:00:00.000Z")
      )
    ).toEqual([uuid11, uuid12]);
  });
});

describe("deduceAdminRole", () => {
  test("should deduce admin role", () => {
    expect(deduceAdminRole(APIAdminRole.Approver)).toEqual(
      "Administration-Approver"
    );
    expect(deduceAdminRole(APIAdminRole.Preparer)).toEqual(
      "Administration-Preparer"
    );
  });
});

describe("canAccess", () => {
  test("admin", () => {
    expect(
      canAccess(
        makeGrantedPermissionsFromUserGroups(
          dummyAdminApproverUserGroups,
          DUMMY_SCHEME_UUID
        ),
        DummyGroupNameCode.ADMIN,
        DummyPermitNameCode.ADMIN_PREPARER,
        IS_ROLE_IGNORED
      )
    ).toEqual(false);

    expect(
      canAccess(
        makeGrantedPermissionsFromUserGroups(
          dummyAdminPreparerUserGroups,
          DUMMY_SCHEME_UUID
        ),
        DummyGroupNameCode.ADMIN,
        DummyPermitNameCode.ADMIN_PREPARER,
        IS_ROLE_IGNORED
      )
    ).toEqual(true);
  });

  test("user", () => {
    const userGroups: UserGroup[] = [
      {
        accessRights: [
          {
            permissions: [
              {
                groupNameCode: "g1",
                permissionsItems: [
                  {
                    permissionUuid: "uuid",
                    permitName: "Name",
                    permitNameCode: "p1",
                    roleType: "r1",
                  },
                ],
                permitGroupName: "Group 1",
              },
            ],
            schemeUuids: ["scheme1"],
          },
          {
            permissions: [
              {
                groupNameCode: "g2",
                permissionsItems: [
                  {
                    permissionUuid: "uuid",
                    permitName: "Name",
                    permitNameCode: "p2",
                    roleType: "r2",
                  },
                ],
                permitGroupName: "Group 1",
              },
            ],
            schemeUuids: ["scheme2"],
          },
        ],
        effectiveDateOfUserGroup: new Date("2023-03-10T00:00:00.000Z"),
        userGroupName: "group1",
        userGroupUuid: "group1",
      },
    ];

    expect(
      canAccess(
        makeGrantedPermissionsFromUserGroups(userGroups, "scheme1"),
        "g1",
        "p1",
        (role) => role === "r1" || role === "r2"
      )
    ).toEqual(true);

    expect(
      canAccess(
        makeGrantedPermissionsFromUserGroups(userGroups, "scheme1"),
        "g2",
        "p2",
        (role) => role === "r1" || role === "r2"
      )
    ).toEqual(false);

    expect(
      canAccess(
        makeGrantedPermissionsFromUserGroups(userGroups, "scheme2"),
        "g2",
        "p2",
        (role) => role === "r1" || role === "r2"
      )
    ).toEqual(true);

    expect(
      canAccess(
        makeGrantedPermissionsFromUserGroups(
          userGroups,
          "scheme2",
          new Date("2023-03-09T00:00:00.000Z")
        ),
        "g2",
        "p2",
        (role) => role === "r1" || role === "r2"
      )
    ).toEqual(false);
  });

  test("user no scheme", () => {
    const userGroups: UserGroup[] = [
      {
        accessRights: [
          {
            permissions: [
              {
                groupNameCode: "g1",
                permissionsItems: [
                  {
                    permissionUuid: "uuid",
                    permitName: "Name",
                    permitNameCode: "p1",
                    roleType: "r1",
                  },
                ],
                permitGroupName: "Group 1",
              },
            ],
            schemeUuids: ["scheme1"],
          },
          {
            permissions: [
              {
                groupNameCode: "g2",
                permissionsItems: [
                  {
                    permissionUuid: "uuid",
                    permitName: "Name",
                    permitNameCode: "p2",
                    roleType: "r2",
                  },
                ],
                permitGroupName: "Group 1",
              },
            ],
            schemeUuids: ["scheme2"],
          },
        ],
        effectiveDateOfUserGroup: new Date("2023-03-10T00:00:00.000Z"),
        userGroupName: "group1",
        userGroupUuid: "group1",
      },
    ];

    expect(
      canAccess(
        makeGrantedPermissionsFromUserGroups(userGroups, null),
        "g1",
        "p1",
        (role) => role === "r1" || role === "r2"
      )
    ).toEqual(true);
  });
});

test("filterWithUserFunctionMenu", () => {
  interface Model {
    abc: number;
    children?: DecoratedModel[];
  }
  type DecoratedModel = WithUserFunctionMenuFilter<Model>;

  const models: DecoratedModel[] = [
    { abc: 1 },
    { abc: 2, children: [] },
    {
      abc: 3,
      children: [
        {
          abc: 32,
          userFunctionMenuFilter: { category: "c998", functionName: "f998" },
        },
        {
          abc: 32,
          userFunctionMenuFilter: { category: "c999", functionName: "f999" },
        },
      ],
    },
    {
      abc: 4,
      children: [
        {
          abc: 31,
        },
        {
          abc: 32,
          userFunctionMenuFilter: { category: "c1", functionName: "f1" },
        },
        {
          abc: 32,
          userFunctionMenuFilter: { category: "c997", functionName: "f997" },
        },
      ],
    },

    {
      abc: 5,
      userFunctionMenuFilter: { category: "c100", functionName: "f100" },
    },
    {
      abc: 6,
      children: [],
      userFunctionMenuFilter: { category: "c100", functionName: "f100" },
    },
    {
      abc: 7,
      userFunctionMenuFilter: { category: "c100", functionName: "f100" },
      children: [
        {
          abc: 32,
          userFunctionMenuFilter: { category: "c998", functionName: "f998" },
        },
        {
          abc: 32,
          userFunctionMenuFilter: { category: "c999", functionName: "f999" },
        },
      ],
    },
    {
      abc: 8,
      userFunctionMenuFilter: { category: "c100", functionName: "f100" },
      children: [
        {
          abc: 31,
        },
        {
          abc: 32,
          userFunctionMenuFilter: { category: "c1", functionName: "f1" },
        },
        {
          abc: 32,
          userFunctionMenuFilter: { category: "c997", functionName: "f997" },
        },
      ],
    },

    {
      abc: 9,
      userFunctionMenuFilter: { category: "c199", functionName: "f199" },
    },
  ];

  expect(filterPageWithUserFunctionMenu(models, [], "children")).toEqual([
    { abc: 1 },
    {
      abc: 4,
      children: [
        {
          abc: 31,
        },
      ],
    },
  ]);

  expect(
    filterPageWithUserFunctionMenu(
      models,
      [
        {
          category: "c1",
          functionId: "",
          functionName: "f1",
          functionType: "Page",
        },
      ],
      "children"
    )
  ).toEqual([
    { abc: 1 },
    {
      abc: 4,
      children: [
        {
          abc: 31,
        },
        {
          abc: 32,
          userFunctionMenuFilter: { category: "c1", functionName: "f1" },
        },
      ],
    },
  ]);

  expect(
    filterPageWithUserFunctionMenu(
      models,
      [
        {
          category: "c1",
          functionId: "",
          functionName: "f1",
          functionType: "Page",
        },
        {
          category: "c100",
          functionId: "",
          functionName: "f100",
          functionType: "Page",
        },
      ],
      "children"
    )
  ).toEqual([
    { abc: 1 },
    {
      abc: 4,
      children: [
        {
          abc: 31,
        },
        {
          abc: 32,
          userFunctionMenuFilter: { category: "c1", functionName: "f1" },
        },
      ],
    },

    {
      abc: 5,
      userFunctionMenuFilter: { category: "c100", functionName: "f100" },
    },
    {
      abc: 8,
      userFunctionMenuFilter: { category: "c100", functionName: "f100" },
      children: [
        {
          abc: 31,
        },
        {
          abc: 32,
          userFunctionMenuFilter: { category: "c1", functionName: "f1" },
        },
      ],
    },
  ]);
});
