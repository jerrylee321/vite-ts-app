import React, { ReactElement, useCallback, useMemo, useState } from "react";
import { Trans } from "react-i18next";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import cn from "classnames";

import { AccessRightRoleType } from "../../apis/models/AccessRightRoleType";
import {
  AllPermissionsOnChangeFunction,
  SinglePermissionOnChangeFunction,
  useUpdateAccessRight,
} from "../../hooks/useUpdateAccessRight";
import {
  AccessRightModuleEntry,
  AccessRightModuleGroupEntries,
  AccessRightPermission,
} from "../../models/accessRight";

interface SinglePermissionCheckBoxProps {
  readonly: boolean;
  checked: boolean;
  onChange: SinglePermissionOnChangeFunction;
  permissionUuid: string;
}

interface AllPermissionCheckBoxProps {
  roleType: AccessRightRoleType;
  checked: boolean;
  onChange: AllPermissionsOnChangeFunction;
}

const SinglePermissionCheckBox = (
  props: SinglePermissionCheckBoxProps
): ReactElement | null => {
  const { readonly, permissionUuid, checked, onChange } = props;
  const onCheckBoxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.checked, permissionUuid);
    },
    [onChange, permissionUuid]
  );

  if (readonly && !checked) {
    return null;
  }

  return (
    <Checkbox
      data-testid="ModuleAccessRightTableCheckBox"
      className={cn({
        "text-moduleTable-main": !readonly,
        "text-spanishGray-main": readonly,
      })}
      checked={checked}
      onChange={onCheckBoxChange}
      disabled={readonly}
    />
  );
};

const AllPermissionCheckBox = (
  props: AllPermissionCheckBoxProps
): ReactElement => {
  const { roleType, checked, onChange } = props;
  const onCheckBoxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(roleType, event.target.checked);
    },
    [onChange, roleType]
  );

  return (
    <Checkbox
      data-testid="ModuleAccessRightTableCheckBox"
      className="text-moduleTable-main"
      checked={checked}
      onChange={onCheckBoxChange}
    />
  );
};

interface AccessRightSettingPermissionRowProps {
  readonly: boolean;
  moduleName: string;
  moduleCode: string;
  roleModuleList: { [key in AccessRightRoleType]: AccessRightPermission[] };
  checkedPermissionUuids: { [key in AccessRightRoleType]: string[] };
  singlePermissionOnChange: SinglePermissionOnChangeFunction;
  enableGrouping: boolean;
  isTheOnlyPreparerInSubmodule?: boolean;
}

const roleValues = Object.values(AccessRightRoleType);

const AccessRightSettingPermissionRow = (
  props: AccessRightSettingPermissionRowProps
): ReactElement => {
  const {
    readonly,
    moduleName,
    moduleCode,
    roleModuleList,
    checkedPermissionUuids,
    singlePermissionOnChange,
    enableGrouping,
    isTheOnlyPreparerInSubmodule,
  } = props;

  const getPermissionUuidByRole = useCallback(
    (role: AccessRightRoleType) =>
      roleModuleList[role].find((it) => it.permitNameCode === moduleCode)
        ?.permissionUuid,
    [moduleCode, roleModuleList]
  );

  const permissionsChecked = useMemo(() => {
    const permissions = roleValues.map((it) => {
      const permissionUuidByRole = getPermissionUuidByRole(it);
      return checkedPermissionUuids[it].includes(permissionUuidByRole ?? "");
    });

    const preparerIndex = roleValues.indexOf(AccessRightRoleType.preparer);
    const enquirerIndex = roleValues.indexOf(AccessRightRoleType.enquirer);

    // Enquirer role override preparer role permission
    if (permissions[enquirerIndex]) {
      permissions[preparerIndex] = false;
    }

    return permissions;
  }, [checkedPermissionUuids, getPermissionUuidByRole]);

  return (
    <TableRow className="h-18">
      <TableCell>
        <Typography
          className={cn("text-sm text-moduleTable-light", {
            "ml-24 before:content-['•'] before:relative before:-left-2":
              enableGrouping,
          })}
        >
          {moduleName}
        </Typography>
        {isTheOnlyPreparerInSubmodule ? (
          <Typography className="mt-2 ml-24 text-sm font-bold text-error-main">
            <Trans i18nKey="ModuleAccessRightTable.accessTable.onlyPreparerInSubModule" />
          </Typography>
        ) : null}
      </TableCell>
      {roleValues.map((it, index) => {
        const permissionUuidByRole = getPermissionUuidByRole(it);
        if (permissionUuidByRole != null) {
          return (
            <TableCell key={permissionUuidByRole}>
              <div className="flex flex-col items-center">
                <SinglePermissionCheckBox
                  data-testid={`${it}CheckBox`}
                  checked={permissionsChecked[index]}
                  onChange={singlePermissionOnChange}
                  permissionUuid={permissionUuidByRole}
                  readonly={readonly}
                />
              </div>
            </TableCell>
          );
        }
        return roleModuleList[it].length !== 0 ? (
          <TableCell key={`${it}-null`} />
        ) : null;
      })}
    </TableRow>
  );
};

interface AccessRightSettingGroupingRowProps
  extends Omit<
    AccessRightSettingPermissionRowProps,
    "moduleName" | "moduleCode"
  > {
  groupName: string;
  moduleEntries: AccessRightModuleEntry[];
}

const AccessRightSettingGroupingRow = (
  props: AccessRightSettingGroupingRowProps
): ReactElement => {
  const {
    readonly,
    groupName,
    moduleEntries,
    roleModuleList,
    checkedPermissionUuids,
    singlePermissionOnChange,
    enableGrouping,
  } = props;

  const [open, setOpen] = useState(true);

  const toggleCollapsibleRow = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <>
      <TableRow className="h-18">
        <TableCell className="cursor-pointer" onClick={toggleCollapsibleRow}>
          <div className="flex items-center text-moduleTable-main">
            {open ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
            <Typography className="text-sm font-bold ">{groupName}</Typography>
          </div>
        </TableCell>
        {roleValues.map((it) => {
          return roleModuleList[it].length !== 0 ? (
            <TableCell
              key={it}
              className="cursor-pointer"
              onClick={toggleCollapsibleRow}
            />
          ) : null;
        })}
      </TableRow>
      {open
        ? moduleEntries.map((it) => (
            <AccessRightSettingPermissionRow
              key={it.permitNameCode}
              moduleName={it.moduleName}
              moduleCode={it.permitNameCode}
              roleModuleList={roleModuleList}
              checkedPermissionUuids={checkedPermissionUuids}
              singlePermissionOnChange={singlePermissionOnChange}
              readonly={readonly}
              enableGrouping={enableGrouping}
              isTheOnlyPreparerInSubmodule={it.preparerFlag}
            />
          ))
        : null}
    </>
  );
};

export interface ModuleAccessRightTableProps {
  readOnly: boolean;
  permissions: AccessRightPermission[];
  onPermissionsChange: (permissions: AccessRightPermission[]) => void;
  fullPermissionList: AccessRightPermission[];
  enableGrouping: boolean;
}

const ModuleAccessRightTable = (
  props: ModuleAccessRightTableProps
): ReactElement => {
  const {
    readOnly,
    permissions,
    onPermissionsChange,
    fullPermissionList,
    enableGrouping,
  } = props;

  const displayOption = useMemo(() => {
    return {
      [AccessRightRoleType.preparer]:
        fullPermissionList.find(
          (it) => it.roleType === AccessRightRoleType.preparer
        ) != null,
      [AccessRightRoleType.supervisor]:
        fullPermissionList.find(
          (it) => it.roleType === AccessRightRoleType.supervisor
        ) != null,
      [AccessRightRoleType.enquirer]:
        fullPermissionList.find(
          (it) => it.roleType === AccessRightRoleType.enquirer
        ) != null,
    };
  }, [fullPermissionList]);

  const moduleList = useMemo(() => {
    const mList = fullPermissionList.filter(
      (raw, index, self) =>
        self.findIndex((it) => it.permitNameCode === raw.permitNameCode) ===
        index
    );

    const result = mList.map((m) => {
      const preparerFlag = permissions.find(
        (p) =>
          p.groupNameCode === m.groupNameCode &&
          p.permitNameCode === m.permitNameCode
      )?.preparerFlag;

      return {
        ...m,
        preparerFlag,
      };
    });

    return result;
  }, [fullPermissionList, permissions]);

  const { singlePermissionOnChange, allPermissionsOnChange } =
    useUpdateAccessRight({
      permissions,
      onPermissionsChange,
      fullPermissionList,
    });

  const checkedPermissionUuids: { [key in AccessRightRoleType]: string[] } =
    useMemo(() => {
      return {
        [AccessRightRoleType.preparer]: permissions
          .filter((it) => it.roleType === AccessRightRoleType.preparer)
          .map((it) => it.permissionUuid),
        [AccessRightRoleType.supervisor]: permissions
          .filter((it) => it.roleType === AccessRightRoleType.supervisor)
          .map((it) => it.permissionUuid),
        [AccessRightRoleType.enquirer]: permissions
          .filter((it) => it.roleType === AccessRightRoleType.enquirer)
          .map((it) => it.permissionUuid),
      };
    }, [permissions]);

  const roleModuleList: {
    [key in AccessRightRoleType]: AccessRightPermission[];
  } = useMemo(() => {
    return {
      [AccessRightRoleType.preparer]: fullPermissionList.filter(
        (it) => it.roleType === AccessRightRoleType.preparer
      ),
      [AccessRightRoleType.supervisor]: fullPermissionList.filter(
        (it) => it.roleType === AccessRightRoleType.supervisor
      ),
      [AccessRightRoleType.enquirer]: fullPermissionList.filter(
        (it) => it.roleType === AccessRightRoleType.enquirer
      ),
    };
  }, [fullPermissionList]);

  const availableModuleCodeList = useMemo(() => {
    return moduleList.reduce<AccessRightModuleEntry[]>((previous, current) => {
      if (
        previous.findIndex(
          (it) => it.permitNameCode === current.permitNameCode
        ) === -1
      ) {
        return [
          ...previous,
          {
            permitNameCode: current.permitNameCode,
            moduleName: current.moduleName,
            groupName: current.groupName,
            groupNameCode: current.groupNameCode,
            preparerFlag: current.preparerFlag,
          },
        ];
      }
      return previous;
    }, []);
  }, [moduleList]);

  const availableModuleGroupList = useMemo(() => {
    return availableModuleCodeList.reduce<AccessRightModuleGroupEntries>(
      (previous, current) => {
        const previousModuleEntries =
          previous[current.groupNameCode]?.moduleEntries ?? [];

        previous[current.groupNameCode] = {
          groupName: current.groupName,
          moduleEntries: [
            ...previousModuleEntries,
            {
              permitNameCode: current.permitNameCode,
              moduleName: current.moduleName,
              groupName: current.groupName,
              groupNameCode: current.groupNameCode,
              preparerFlag: current.preparerFlag,
            },
          ],
        };

        return previous;
      },
      {}
    );
  }, [availableModuleCodeList]);

  const getModuleHeaderKeyByRole = useCallback((role: AccessRightRoleType) => {
    if (role === AccessRightRoleType.preparer) {
      return "ModuleAccessRightTable.preparerHeader";
    }
    if (role === AccessRightRoleType.supervisor) {
      return "ModuleAccessRightTable.supervisorHeader";
    }
    return "ModuleAccessRightTable.enquirerHeader";
  }, []);

  const isAllCheckedPermissionHasSameRole = useCallback(
    (role: AccessRightRoleType) => {
      if (permissions.find((it) => it.roleType !== role) != null) {
        return false;
      }

      const checkedPermission = checkedPermissionUuids[role];

      if (checkedPermission.length === 0) {
        return false;
      }
      return checkedPermission.length === roleModuleList[role].length;
    },
    [checkedPermissionUuids, permissions, roleModuleList]
  );

  return (
    <Table data-testid="ModuleAccessRightTable">
      <TableHead>
        <TableRow>
          <TableCell className="w-8/12">
            <Typography className="text-sm font-bold text-independence-main">
              <Trans i18nKey="ModuleAccessRightTable.moduleNameHeader" />
            </Typography>
          </TableCell>
          {roleValues.map((role) => {
            return displayOption[role] ? (
              <TableCell className="w-2/12" key={role}>
                <div className="flex flex-col items-center">
                  <Typography className="text-center text-sm font-bold text-independence-main">
                    <Trans i18nKey={getModuleHeaderKeyByRole(role)} />
                  </Typography>
                  {!readOnly ? (
                    <AllPermissionCheckBox
                      roleType={role}
                      onChange={allPermissionsOnChange}
                      checked={isAllCheckedPermissionHasSameRole(role)}
                    />
                  ) : null}
                </div>
              </TableCell>
            ) : null;
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {enableGrouping
          ? Object.entries(availableModuleGroupList).map(([key, value]) => (
              <AccessRightSettingGroupingRow
                key={key}
                groupName={value?.groupName ?? ""}
                moduleEntries={value?.moduleEntries ?? []}
                roleModuleList={roleModuleList}
                checkedPermissionUuids={checkedPermissionUuids}
                singlePermissionOnChange={singlePermissionOnChange}
                readonly={readOnly}
                enableGrouping={enableGrouping}
              />
            ))
          : availableModuleCodeList.map((it) => (
              <AccessRightSettingPermissionRow
                key={it.permitNameCode}
                moduleName={it.moduleName}
                moduleCode={it.permitNameCode}
                roleModuleList={roleModuleList}
                checkedPermissionUuids={checkedPermissionUuids}
                singlePermissionOnChange={singlePermissionOnChange}
                readonly={readOnly}
                enableGrouping={enableGrouping}
                isTheOnlyPreparerInSubmodule={it.preparerFlag}
              />
            ))}
      </TableBody>
    </Table>
  );
};

export default ModuleAccessRightTable;
