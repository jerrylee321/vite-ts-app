import makeDummyUserGroup from "frontend-common/src/utils/makeDummyUserGroup";

import { DummyGroupNameCode } from "./groupNameCode";
import { DummyPermitNameCode } from "./permitNameCode";

export const DUMMY_SCHEME_UUID = "dummy-scheme-uuid";

export const dummyAdminPreparerUserGroups = [
  makeDummyUserGroup(
    DummyGroupNameCode.ADMIN,
    DummyPermitNameCode.ADMIN_PREPARER,
    DUMMY_SCHEME_UUID
  ),
  makeDummyUserGroup(
    DummyGroupNameCode.ADMIN,
    DummyPermitNameCode.ADMIN_ALL,
    DUMMY_SCHEME_UUID
  ),
];

export const dummyAdminApproverUserGroups = [
  makeDummyUserGroup(
    DummyGroupNameCode.ADMIN,
    DummyPermitNameCode.ADMIN_APPROVER,
    DUMMY_SCHEME_UUID
  ),
  makeDummyUserGroup(
    DummyGroupNameCode.ADMIN,
    DummyPermitNameCode.ADMIN_ALL,
    DUMMY_SCHEME_UUID
  ),
];
