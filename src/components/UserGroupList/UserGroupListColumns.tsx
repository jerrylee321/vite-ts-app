import { ReactElement, useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";
import { CellProps, Column } from "react-table";
import { Checkbox } from "@mui/material";
import { ReactComponent as DeleteIcon } from "frontend-common/src/assets/icons/delete.svg";
import { ReactComponent as ViewIcon } from "frontend-common/src/assets/icons/view.svg";
import SvgIconButton from "frontend-common/src/components/SvgIconButton";
import { AdminRole } from "frontend-common/src/utils/permission";

import { schemeNameToId, UserGroupItem } from "./model";

interface UserGroupDeleteButtonProps {
  userGroupId: string;
  onClickDeleteUserGroupButton: (userGroupId: string) => void;
}
interface UserGroupDetailButtonProps {
  userGroupId: string;
  onClickViewUserGroupDetailButton: (userGroupId: string) => void;
}

export const UserGroupDeleteButton = (
  props: UserGroupDeleteButtonProps
): ReactElement => {
  const { userGroupId, onClickDeleteUserGroupButton } = props;
  const { t } = useTranslation();

  const onClick = useCallback(() => {
    onClickDeleteUserGroupButton(userGroupId);
  }, [onClickDeleteUserGroupButton, userGroupId]);

  return (
    <SvgIconButton
      className="hover:from-black/[0] hover:to-black/[0] active:from-black/[0] active:to-black/[0]"
      aria-label={t("UserGroupListSection.userGroupList.actionButton.delete")}
      data-testid="deleteUserGroupButton"
      onClick={onClick}
      Icon={DeleteIcon}
    />
  );
};

export const UserGroupDetailButton = (
  props: UserGroupDetailButtonProps
): ReactElement => {
  const { userGroupId, onClickViewUserGroupDetailButton } = props;
  const { t } = useTranslation();

  const onClick = useCallback(() => {
    onClickViewUserGroupDetailButton(userGroupId);
  }, [onClickViewUserGroupDetailButton, userGroupId]);

  return (
    <SvgIconButton
      className="hover:from-black/[0] hover:to-black/[0] active:from-black/[0] active:to-black/[0]"
      aria-label={t("UserGroupListSection.userGroupList.actionButton.delete")}
      data-testid="userGroupDetailButton"
      onClick={onClick}
      Icon={ViewIcon}
    />
  );
};

const userGroupListCommonColumn: Column<UserGroupItem>[] = [
  {
    Header: (
      <Trans i18nKey="UserGroupListSection.userGroupList.header.userGroupName" />
    ),
    i18nKey: "UserGroupListSection.userGroupList.header.userGroupName",
    accessor: "userGroupName",
  },
  {
    Header: (
      <Trans i18nKey="UserGroupListSection.userGroupList.header.userNumber" />
    ),
    i18nKey: "UserGroupListSection.userGroupList.header.userNumber",
    accessor: "userNum",
  },
];

const userGroupListSchemeColumn = (
  schemeNames: string[]
): Column<UserGroupItem>[] => {
  return schemeNames.map((schemeName) => {
    return {
      Header: schemeName,
      i18nKey: null,
      accessor: schemeNameToId(schemeName),
      disableSortBy: true,
      Cell: (props: { value: any }): ReactElement => {
        const { value } = props;
        if (value === true) {
          return (
            <Checkbox
              className="text-spanishGray-main"
              checked={true}
              disabled={true}
            />
          );
        }
        return <></>;
      },
    };
  });
};

export const UserGroupListColumn = (
  onClickDeleteUserGroupButton: (userGroupId: string) => void,
  onClickViewUserGroupDetailButton: (userGroupId: string) => void,
  schemeNames: string[],
  role: AdminRole | null
): Column<UserGroupItem>[] => {
  const schemeColumn = userGroupListSchemeColumn(schemeNames);

  return [
    ...userGroupListCommonColumn,
    ...schemeColumn,
    {
      id: "action",
      Header: (
        <Trans i18nKey="UserGroupListSection.userGroupList.header.action" />
      ),
      i18nKey: "UserGroupListSection.userGroupList.header.action",
      accessor: "userGroupUuid",
      disableSortBy: true,
      Cell: ({
        value: userGroupUuid,
      }: CellProps<UserGroupItem, string | boolean | number>): ReactElement => {
        return (
          <div className="flex flex-row">
            {role === "Administration-Preparer" ? (
              <UserGroupDeleteButton
                userGroupId={userGroupUuid as string}
                onClickDeleteUserGroupButton={onClickDeleteUserGroupButton}
              />
            ) : null}
            <UserGroupDetailButton
              userGroupId={userGroupUuid as string}
              onClickViewUserGroupDetailButton={
                onClickViewUserGroupDetailButton
              }
            />
          </div>
        );
      },
    },
  ];
};
