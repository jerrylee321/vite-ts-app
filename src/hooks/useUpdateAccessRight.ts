import { useCallback } from "react";

import { AccessRightRoleType } from "../apis/models/AccessRightRoleType";
import { AccessRightPermission } from "../models/accessRight";

export interface UseUpdateAccessRightProps {
  permissions: AccessRightPermission[];
  onPermissionsChange: (permissions: AccessRightPermission[]) => void;
  fullPermissionList: AccessRightPermission[];
}

export type SinglePermissionOnChangeFunction = (
  checked: boolean,
  permissionUuid: string
) => void;

export type AllPermissionsOnChangeFunction = (
  roleType: AccessRightRoleType,
  checked: boolean
) => void;

interface PermissionOnChangeFunctions {
  singlePermissionOnChange: SinglePermissionOnChangeFunction;
  allPermissionsOnChange: AllPermissionsOnChangeFunction;
}

export const useUpdateAccessRight = (
  props: UseUpdateAccessRightProps
): PermissionOnChangeFunctions => {
  const { permissions, onPermissionsChange, fullPermissionList } = props;

  const singlePermissionOnChange = useCallback(
    (checked: boolean, permissionUuid: string) => {
      const permission = fullPermissionList.find(
        (it) => it.permissionUuid === permissionUuid
      );

      if (permission == null) {
        throw Error("Cannot find Permission in Permission List");
      }
      const newPermissions = permissions.filter(
        (it) => it.permitNameCode !== permission.permitNameCode
      );
      if (!checked) {
        onPermissionsChange(newPermissions);
        return;
      }

      newPermissions.push({
        ...permission,
      });

      onPermissionsChange(newPermissions);
    },
    [fullPermissionList, permissions, onPermissionsChange]
  );

  const allPermissionsOnChange = useCallback(
    (roleType: AccessRightRoleType, checked: boolean) => {
      if (checked) {
        // if clicked Check All
        onPermissionsChange(
          fullPermissionList.filter((it) => it.roleType === roleType)
        );
        return;
      }

      // if clicked Uncheck All
      onPermissionsChange([]);
    },
    [fullPermissionList, onPermissionsChange]
  );

  return {
    singlePermissionOnChange: singlePermissionOnChange,
    allPermissionsOnChange: allPermissionsOnChange,
  };
};
