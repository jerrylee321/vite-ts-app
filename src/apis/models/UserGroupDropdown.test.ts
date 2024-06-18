import { CommonOption } from "../../models/option";

import {
  mapUserGroupDropDownListToCommonOptionList,
  UserGroupDropdown,
} from "./UserGroupDropdown";

test("mapUserGroupDropDownListToCommonOptionList", () => {
  const mockDropDownList: UserGroupDropdown[] = [
    {
      userGroupName: "group1",
      userGroupUuid: "uuid1",
    },
  ];

  const expectedCommonOption: CommonOption[] = [
    { key: "uuid1", name: "group1" },
  ];
  expect(mapUserGroupDropDownListToCommonOptionList(mockDropDownList)).toEqual(
    expectedCommonOption
  );
});
