type _UserGroupItem = {
  userGroupName: string;
  userNum: string;
  userGroupUuid: string;
} & Record<string, string | boolean>;

export interface UserGroupItem extends _UserGroupItem {}

// Use this function to transform scheme name to table record accessor
export function schemeNameToId(schemeName: string): string {
  return schemeName.replace(/\W/g, "");
}
