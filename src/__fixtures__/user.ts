export default {
  userAccountDetail: {
    userUuid: "mock id",
    userName: "mock user",
    userId: "mock id",
    status: "ACTIVE",
    department: "mock depart",
    title: null,
    email: "mock@mock.com",
    officeTelNo: "99999999",
    effectiveDate: "01/31/2023",
    endDate: null,
    suspensionDate: null,
    userGroupUuids: ["f63c9930-c9da-c3d6-e053-0b15d70a064f"],
    role: "role",
  },
  userGroups: [
    {
      userGroupUuid: "f65dd683-d28c-905e-e053-0b15d70a69ce",
      userGroupName: "Administration-Preparer",
      effectiveDateOfUserGroup: new Date("2022-03-10T00:00:00.000Z"),
      accessRights: [
        {
          schemeUuids: ["e3e9a72e-09da-33f7-e053-0b15d70a5be2"],
          permissions: [
            {
              groupNameCode: "MPFA_ADHOC_INFO",
              permitGroupName: "MPFA_ADHOC_INFO",
              permissionsItems: [
                {
                  permissionUuid: "f1e46945-6ad0-6b48-e053-0b15d70a059e",
                  roleType: "Preparer",
                  permitName: "MPFA_ADHOC_INFO",
                  permitNameCode: "MPFA_ADHOC_INFO",
                },
              ],
            },
            {
              groupNameCode: "MPFA_DCR_ACTIONS",
              permitGroupName: "MPFA_DCR_ACTIONS",
              permissionsItems: [
                {
                  permissionUuid: "f1e46945-6ac4-6b48-e053-0b15d70a059e",
                  roleType: "Preparer",
                  permitName: "DCR_INFO_ENQ",
                  permitNameCode: "DCR_INFO_ENQ",
                },
              ],
            },
            {
              groupNameCode: "MPFA_STATS_RETURNS",
              permitGroupName: "Statistical Returns",
              permissionsItems: [
                {
                  permissionUuid: "f04f4933-1ebd-6fa0-e053-0c15d70a3d1d",
                  roleType: "Preparer",
                  permitName: "Statistical Returns",
                  permitNameCode: "MPFA_STATS_RETURNS",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
