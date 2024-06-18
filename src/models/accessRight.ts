import { UserPermission } from "../apis/models/UserAccountDetails";

export interface AccessRightPermission {
  permissionUuid: string;
  moduleName: string;
  permitNameCode: string;
  roleType: string;
  groupName: string;
  groupNameCode: string;
  preparerFlag?: boolean;
}

export interface AccessRightModuleEntry {
  moduleName: string;
  permitNameCode: string;
  groupName: string;
  groupNameCode: string;
  preparerFlag?: boolean;
}

export type AccessRightModuleGroupEntries = Record<
  string,
  | {
      groupName: string;
      moduleEntries: AccessRightModuleEntry[];
    }
  | undefined
>;

export function fromUserPermission(
  permissionItem: UserPermission,
  groupName: string,
  groupNameCode: string
): AccessRightPermission {
  return {
    permissionUuid: permissionItem.permissionUuid,
    moduleName: permissionItem.permitName,
    permitNameCode: permissionItem.permitNameCode,
    roleType: permissionItem.roleType,
    groupName,
    groupNameCode,
    preparerFlag: permissionItem.preparerFlag,
  };
}
