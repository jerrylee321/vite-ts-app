import { z } from "zod";

import { CommonOption } from "../../models/option";

export const UserGroupDropdownSchema = z.object({
  userGroupUuid: z.string(),
  userGroupName: z.string(),
});

export type UserGroupDropdown = z.infer<typeof UserGroupDropdownSchema>;

export const mapUserGroupDropDownListToCommonOptionList = (
  dropDownList: UserGroupDropdown[]
): CommonOption[] => {
  return dropDownList.map((dropDown) => ({
    key: dropDown.userGroupUuid,
    name: dropDown.userGroupName,
  }));
};
