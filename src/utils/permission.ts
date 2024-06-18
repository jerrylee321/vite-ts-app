import { APIAdminRole, UserGroup } from "../apis/models/UserAccountDetails";
import { UserFunctionMenuItem } from "../apis/models/UserFunctionMenu";
import { Module } from "../models/module";
import { RouteMenuItem } from "../models/route";
import {
  UserFunctionMenuFilter,
  WithUserFunctionMenuFilter,
} from "../models/userFunctionMenu";

type AccessRight = UserGroup["accessRights"][number];
type PermitGroup = AccessRight["permissions"][number];
type Permit = PermitGroup["permissionsItems"][number];

type GroupNameCode = PermitGroup["groupNameCode"];
type PermitNameCode = Permit["permitNameCode"];

type IPermissionAsset<ChildrenKey extends string> = {
  permitNameCode?: string;
  groupNameCode?: string;
} & { [k in ChildrenKey]?: IPermissionAsset<ChildrenKey>[] | null };

type IWithPermitNameCode = Pick<Permit, "permitNameCode">;

type PermitCodePermitMap = {
  [key in PermitNameCode]?: Permit[];
};

type GroupCodePermitCodeRoleMap = {
  [key in GroupNameCode]?: PermitCodePermitMap;
};

const isUserGroupEffective = (asOf: Date) => (userGroup: UserGroup) => {
  return userGroup.effectiveDateOfUserGroup.getTime() <= asOf.getTime();
};

const isUserGroupSchemeUuid =
  (schemeUuid: string) => (userGroup: UserGroup) => {
    return (
      userGroup.accessRights.filter((accessRight) =>
        accessRight.schemeUuids.includes(schemeUuid)
      ).length > 0
    );
  };

export function getUserGroupsBySchemeUuid(
  userGroups: UserGroup[],
  schemeUuid: string,
  asOf: Date
): UserGroup[] {
  return userGroups
    .filter(isUserGroupEffective(asOf))
    .filter(isUserGroupSchemeUuid(schemeUuid));
}

function collectPermitGroupsWithScheme(
  userGroups: UserGroup[],
  schemeUuid: string | null
): PermitGroup[] {
  let res: PermitGroup[] = [];

  for (const userGroup of userGroups) {
    for (const accessRight of userGroup.accessRights) {
      if (!schemeUuid || accessRight.schemeUuids.includes(schemeUuid)) {
        res = [...res, ...accessRight.permissions];
      }
    }
  }

  return res;
}

function aggregatePermitGroups(
  permitGroups: PermitGroup[]
): GroupCodePermitCodeRoleMap {
  const res: GroupCodePermitCodeRoleMap = {};

  for (const permitGroup of permitGroups) {
    const groupNameCode = permitGroup.groupNameCode;
    res[groupNameCode] =
      permitGroup.permissionsItems.reduce<PermitCodePermitMap>(
        (prev, permissionItem) => {
          const permitNameCode = permissionItem.permitNameCode;
          return {
            ...prev,
            [permitNameCode]: [...(prev[permitNameCode] ?? []), permissionItem],
          };
        },
        res[groupNameCode] ?? {}
      );
  }

  return res;
}

function filterItemsWithPermitCodeRoleMap<
  WithPermitNameCodeType extends Partial<IWithPermitNameCode>
>(items: WithPermitNameCodeType[], permitCodeRoleMap: PermitCodePermitMap) {
  const res: WithPermitNameCodeType[] = [];

  for (const item of items) {
    if (item.permitNameCode == null) {
      // No filter when no permit name code
      res.push(item);
    } else {
      const permitNameCode = item.permitNameCode;
      if ((permitCodeRoleMap[permitNameCode]?.length ?? 0) > 0) {
        res.push(item);
      }
    }
  }
  return res;
}

export function filterItemUserGroupsAndScheme<
  ChildrenKey extends string,
  T extends IPermissionAsset<ChildrenKey>
>(
  assets: T[],
  userGroups: UserGroup[],
  schemeUuid: string | null,
  asOf: Date,
  childrenKey: ChildrenKey
): T[] {
  const effectiveGroups = userGroups.filter(
    (userGroup) => userGroup.effectiveDateOfUserGroup <= asOf
  );

  const permitGroupMap = aggregatePermitGroups(
    collectPermitGroupsWithScheme(effectiveGroups, schemeUuid)
  );

  return assets.reduce<T[]>((result, asset) => {
    const { groupNameCode, permitNameCode } = asset;

    if (!groupNameCode) {
      // No filter when no group name code
      return [...result, asset];
    }

    const permitCodeRoleMap = permitGroupMap[groupNameCode];
    if (!permitCodeRoleMap) {
      // group name code not found in user object
      return result;
    }

    if (permitNameCode && !permitCodeRoleMap[permitNameCode]) {
      return result;
    }

    const children = asset[childrenKey];

    if (children == null || children.length === 0) {
      // No filter when no children. Already passes group name code check.
      return [...result, asset];
    }

    const filteredSubItems = filterItemsWithPermitCodeRoleMap(
      children,
      permitCodeRoleMap
    );
    if (filteredSubItems.length > 0) {
      return [
        ...result,
        {
          ...asset,
          [childrenKey]: filteredSubItems,
        },
      ];
    }
    return result;
  }, []);
}

export function filterRouteMenuWithUserGroupsAndScheme(
  routeMenu: RouteMenuItem[],
  userGroups: UserGroup[],
  schemeUuid: string | null,
  asOf: Date
): RouteMenuItem[] {
  return filterItemUserGroupsAndScheme(
    routeMenu,
    userGroups,
    schemeUuid,
    asOf,
    "children"
  );
}

export function filterModulesWithUserGroupsAndScheme(
  modules: Module[],
  userGroups: UserGroup[],
  schemeUuid: string | null,
  asOf: Date
): Module[] {
  return filterItemUserGroupsAndScheme(
    modules,
    userGroups,
    schemeUuid,
    asOf,
    "submodules"
  );
}

export function getPermits(
  userGroups: UserGroup[],
  schemeUuid: string | null,
  groupNameCode: GroupNameCode,
  permitNameCode: PermitNameCode,
  asOf: Date
): Permit[] {
  const effectiveGroups = userGroups.filter(
    (userGroup) =>
      userGroup.effectiveDateOfUserGroup.getTime() <= asOf.getTime()
  );

  const permitGroupMap = aggregatePermitGroups(
    collectPermitGroupsWithScheme(effectiveGroups, schemeUuid)
  );

  return permitGroupMap[groupNameCode]?.[permitNameCode] ?? [];
}

export type AdminRole = "Administration-Preparer" | "Administration-Approver";

export function deduceAdminRole(apiAdminRole: APIAdminRole): AdminRole | null {
  switch (apiAdminRole) {
    case APIAdminRole.Approver:
      return "Administration-Approver";
    case APIAdminRole.Preparer:
      return "Administration-Preparer";
  }
  return null;
}

export function deduceAdminRoleFromRoleList(
  apiAdminRoles: APIAdminRole[]
): AdminRole | null {
  if (apiAdminRoles.indexOf(APIAdminRole.Approver) > -1) {
    return "Administration-Approver";
  }
  if (apiAdminRoles.indexOf(APIAdminRole.Preparer) > -1) {
    return "Administration-Preparer";
  }
  return null;
}

export interface GrantedPermission {
  groupNameCode: string;
  permitNameCode: string;
  role: string;
}

export function makeGrantedPermissionsFromUserGroups(
  userGroups: UserGroup[],
  schemeUuid: string | null,
  asOf: Date = new Date()
): GrantedPermission[] {
  const res: GrantedPermission[] = [];

  for (const userGroup of userGroups.filter(
    (group) => group.effectiveDateOfUserGroup <= asOf
  )) {
    for (const accessRight of userGroup.accessRights.filter(
      (right) => !schemeUuid || right.schemeUuids.includes(schemeUuid)
    )) {
      for (const permission of accessRight.permissions) {
        const { groupNameCode } = permission;
        for (const permissionItem of permission.permissionsItems) {
          const { permitNameCode, roleType } = permissionItem;
          res.push({ groupNameCode, permitNameCode, role: roleType });
        }
      }
    }
  }

  return res;
}

export const IS_ROLE_IGNORED = (): boolean => true;

export function canAccess(
  permissions: GrantedPermission[],
  groupNameCode: string,
  permitNameCode: string,
  isRole: (value: string) => boolean
): boolean {
  return (
    permissions.find(
      (permission) =>
        permission.groupNameCode === groupNameCode &&
        permission.permitNameCode === permitNameCode &&
        isRole(permission.role)
    ) != null
  );
}

/**
 * Determine if there exists an item from userFunctionMenu
 * matching the userFunctionMenuFilter
 */
export function filterPageByUserFunctionMenu(
  userFunctionMenuFilter: UserFunctionMenuFilter,
  userFunctionMenu: UserFunctionMenuItem[]
): boolean {
  return (
    userFunctionMenu.find(
      (m) =>
        m.category === userFunctionMenuFilter.category &&
        m.functionName === userFunctionMenuFilter.functionName &&
        m.functionType === "Page"
    ) != null
  );
}

/**
 * Take away items when non match with any given user function menu items.
 *
 * When all children are removed because of this, the parent item will also
 * be removed.
 */
export function filterPageWithUserFunctionMenu<
  ChildrenKey extends string,
  Children extends WithUserFunctionMenuFilter<unknown> & {
    [key in ChildrenKey]?: Children[];
  },
  Parent extends WithUserFunctionMenuFilter<unknown> & {
    [key in ChildrenKey]?: Children[];
  }
>(
  parent: Parent[],
  userFunctionMenu: UserFunctionMenuItem[],
  childrenKey: ChildrenKey
): Parent[] {
  return (
    parent
      // Filter first level item
      .filter((menuItem) => {
        const { userFunctionMenuFilter } = menuItem;
        if (userFunctionMenuFilter) {
          return filterPageByUserFunctionMenu(
            userFunctionMenuFilter,
            userFunctionMenu
          );
        }
        return true;
      })
      // Filter second level item
      .map((menuItem) => {
        const { [childrenKey]: children } = menuItem;
        if (!children) {
          return menuItem;
        }
        return {
          ...menuItem,
          [childrenKey]: filterPageWithUserFunctionMenu(
            children,
            userFunctionMenu,
            childrenKey
          ),
        };
      })
      // Filter if second level has items but filter out all
      .filter((menuItem) => {
        const { [childrenKey]: children } = menuItem;
        if (children == null) {
          return true;
        }
        return children.length !== 0;
      })
  );
}
