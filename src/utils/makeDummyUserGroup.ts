import { UserGroup } from "../apis/models/UserAccountDetails";

function makeDummyUserGroup(
  groupNameCode: string,
  permitNameCode: string,
  schemeUuid: string
): UserGroup {
  return {
    accessRights: [
      {
        permissions: [
          {
            groupNameCode,
            permissionsItems: [
              {
                permitNameCode,
                permissionUuid: "",
                permitName: "",
                roleType: "",
              },
            ],
            permitGroupName: "",
          },
        ],
        schemeUuids: [schemeUuid],
      },
    ],
    effectiveDateOfUserGroup: new Date(0),
    userGroupName: "",
    userGroupUuid: "",
  };
}

export default makeDummyUserGroup;
