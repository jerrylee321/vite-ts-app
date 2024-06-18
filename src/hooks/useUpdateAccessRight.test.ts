import { act, renderHook } from "@testing-library/react";

import { AccessRightRoleType } from "../apis/models/AccessRightRoleType";
import { AccessRightPermission } from "../models/accessRight";

import {
  useUpdateAccessRight,
  UseUpdateAccessRightProps,
} from "./useUpdateAccessRight";

describe("useUpdateAccessRight", () => {
  const permissions: AccessRightPermission[] = [
    {
      permissionUuid: "ec13c959-a818-0789-e053-0b15d70a8846",
      roleType: AccessRightRoleType.preparer,
      permitNameCode: "Process Review",
      moduleName: "Process Review",
      groupName: "testing-group",
      groupNameCode: "testing-group",
    },
    {
      permissionUuid: "ec13c959-a81b-0789-e053-0b15d70a8846",
      roleType: AccessRightRoleType.supervisor,
      permitNameCode: "Fund Related Management",
      moduleName: "Fund Related Management",
      groupName: "testing-group",
      groupNameCode: "testing-group",
    },
  ];
  const onPermissionsChange = jest.fn();
  const fullPermissionList: AccessRightPermission[] = [
    {
      moduleName: "Process Review",
      roleType: AccessRightRoleType.preparer,
      permissionUuid: "ec13c959-a818-0789-e053-0b15d70a8846",
      permitNameCode: "Process Review",
      groupName: "testing-group",
      groupNameCode: "testing-group",
    },
    {
      moduleName: "Process Review",
      roleType: AccessRightRoleType.supervisor,
      permissionUuid: "ec13c959-a819-0789-e053-0b15d70a8846",
      permitNameCode: "Process Review",
      groupName: "testing-group",
      groupNameCode: "testing-group",
    },
    {
      moduleName: "Fund Related Management",
      roleType: AccessRightRoleType.preparer,
      permissionUuid: "ec13c959-a81a-0789-e053-0b15d70a8846",
      permitNameCode: "Fund Related Management",
      groupName: "testing-group",
      groupNameCode: "testing-group",
    },
    {
      moduleName: "Fund Related Management",
      roleType: AccessRightRoleType.supervisor,
      permissionUuid: "ec13c959-a81b-0789-e053-0b15d70a8846",
      permitNameCode: "Fund Related Management",
      groupName: "testing-group",
      groupNameCode: "testing-group",
    },
  ];

  const props: UseUpdateAccessRightProps = {
    permissions,
    onPermissionsChange: onPermissionsChange,
    fullPermissionList,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update permissions when clicked Check All", () => {
    const { result } = renderHook(() => useUpdateAccessRight(props));
    act(() => {
      result.current.allPermissionsOnChange(AccessRightRoleType.preparer, true);
    });
    expect(onPermissionsChange).toHaveBeenCalledWith([
      {
        moduleName: "Process Review",
        permissionUuid: "ec13c959-a818-0789-e053-0b15d70a8846",
        permitNameCode: "Process Review",
        roleType: AccessRightRoleType.preparer,
        groupName: "testing-group",
        groupNameCode: "testing-group",
      },
      {
        moduleName: "Fund Related Management",
        permissionUuid: "ec13c959-a81a-0789-e053-0b15d70a8846",
        permitNameCode: "Fund Related Management",
        roleType: AccessRightRoleType.preparer,
        groupName: "testing-group",
        groupNameCode: "testing-group",
      },
    ]);
  });

  it("should update permissions when clicked Uncheck All", () => {
    const { result } = renderHook(() => useUpdateAccessRight(props));
    act(() => {
      result.current.allPermissionsOnChange(
        AccessRightRoleType.preparer,
        false
      );
    });
    expect(onPermissionsChange).toHaveBeenCalledWith([]);
  });

  it("should check permissions when clicked on a unchecked permission", () => {
    const { result } = renderHook(() => useUpdateAccessRight(props));
    act(() => {
      result.current.singlePermissionOnChange(
        true,
        "ec13c959-a81a-0789-e053-0b15d70a8846"
      );
    });
    expect(onPermissionsChange).toHaveBeenCalledWith([
      {
        permissionUuid: "ec13c959-a818-0789-e053-0b15d70a8846",
        permitNameCode: "Process Review",
        moduleName: "Process Review",
        roleType: AccessRightRoleType.preparer,
        groupName: "testing-group",
        groupNameCode: "testing-group",
      },
      {
        permissionUuid: "ec13c959-a81a-0789-e053-0b15d70a8846",
        permitNameCode: "Fund Related Management",
        moduleName: "Fund Related Management",
        roleType: AccessRightRoleType.preparer,
        groupName: "testing-group",
        groupNameCode: "testing-group",
      },
    ]);
  });

  it("should uncheck permissions when clicked on a checked permission", () => {
    const { result } = renderHook(() => useUpdateAccessRight(props));
    act(() => {
      result.current.singlePermissionOnChange(
        false,
        "ec13c959-a818-0789-e053-0b15d70a8846"
      );
    });
    expect(onPermissionsChange).toHaveBeenCalledWith([
      {
        permissionUuid: "ec13c959-a81b-0789-e053-0b15d70a8846",
        permitNameCode: "Fund Related Management",
        moduleName: "Fund Related Management",
        roleType: AccessRightRoleType.supervisor,
        groupName: "testing-group",
        groupNameCode: "testing-group",
      },
    ]);
  });

  it("should throw error when no permitNameCode found", () => {
    const { result } = renderHook(() =>
      useUpdateAccessRight({
        permissions,
        onPermissionsChange: onPermissionsChange,
        fullPermissionList: [],
      })
    );
    expect(() => {
      result.current.singlePermissionOnChange(
        false,
        "ec13c959-a818-0789-e053-0b15d70a8846"
      );
    }).toThrowError();
  });
});
