import { useMemo } from "react";
import { useSelector } from "react-redux";
import { deduceAPIAdminRole } from "frontend-common/src/apis/models/UserAccountDetails";
import {
  DUMMY_SCHEME_UUID,
  dummyAdminApproverUserGroups,
  dummyAdminPreparerUserGroups,
} from "frontend-common/src/constants/dummyUserGroup";
import { RootState } from "frontend-common/src/redux";
import {
  canAccess,
  deduceAdminRole,
  makeGrantedPermissionsFromUserGroups,
} from "frontend-common/src/utils/permission";

import { UserAccountDetailsResponse } from "../apis/UserAccountDetailsAPI";
import { useRoutePermission } from "../providers/RequirePermissionRouteProvider";

function useCanAccess(
  userAccountDetails: UserAccountDetailsResponse["payload"] | null | undefined,
  isAdminRole: (value: string) => boolean,
  isUserRole: (value: string) => boolean
): boolean {
  const permissionRouteContext = useRoutePermission();

  const selectedScheme = useSelector(
    (state: RootState) => state.scheme.selectedScheme
  );

  return useMemo(() => {
    if (!userAccountDetails) {
      return false;
    }

    if (permissionRouteContext == null) {
      return true;
    }

    const { groupNameCode, permitNameCode } = permissionRouteContext;

    const apiAdminRole = userAccountDetails.userAccountDetail.role
      ? deduceAPIAdminRole(userAccountDetails.userAccountDetail.role)
      : null;
    const adminRole = apiAdminRole ? deduceAdminRole(apiAdminRole) : null;

    // Admin
    if (adminRole) {
      const adminUserGroups =
        adminRole === "Administration-Approver"
          ? dummyAdminApproverUserGroups
          : dummyAdminPreparerUserGroups;
      return canAccess(
        makeGrantedPermissionsFromUserGroups(
          adminUserGroups,
          DUMMY_SCHEME_UUID
        ),
        groupNameCode,
        permitNameCode,
        isAdminRole
      );
    }

    // User
    return canAccess(
      makeGrantedPermissionsFromUserGroups(
        userAccountDetails.userGroups,
        selectedScheme?.schemeUuid ?? null
      ),
      groupNameCode,
      permitNameCode,
      isUserRole
    );
  }, [
    userAccountDetails,
    permissionRouteContext,
    selectedScheme,
    isUserRole,
    isAdminRole,
  ]);
}

export default useCanAccess;
