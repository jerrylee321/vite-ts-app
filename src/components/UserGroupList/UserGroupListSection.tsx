import React, { ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Accordion from "frontend-common/src/components/Accordion";
import DataTable from "frontend-common/src/components/DataTable";
import { AdminRole } from "frontend-common/src/utils/permission";

import { UserGroupItem } from "./model";
import { UserGroupListColumn } from "./UserGroupListColumns";

interface UserGroupListSectionProps {
  onClickDeleteUserGroupButton: (userGroupId: string) => void;
  onClickViewUserGroupDetailButton: (userGroupId: string) => void;
  isLoading: boolean;
  role: AdminRole | null;
  userGroups: UserGroupItem[];
  schemeNames: string[];
}

const UserGroupListSection = (
  props: UserGroupListSectionProps
): ReactElement => {
  const {
    onClickDeleteUserGroupButton,
    onClickViewUserGroupDetailButton,
    role,
    userGroups,
    schemeNames,
    isLoading,
  } = props;
  const { t } = useTranslation();

  const columns = useMemo(
    () =>
      UserGroupListColumn(
        onClickDeleteUserGroupButton,
        onClickViewUserGroupDetailButton,
        schemeNames,
        role
      ),
    [
      onClickDeleteUserGroupButton,
      onClickViewUserGroupDetailButton,
      role,
      schemeNames,
    ]
  );

  return (
    <Accordion
      title={t("UserGroupListSection.title")}
      className="rounded-2xl"
      disableGutters={true}
    >
      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={userGroups}
        isQuickSearchEnabled={false}
        isPaginationEnabled={false}
        isSelectEnabled={false}
        isExportEnabled={false}
        isExportFullListEnabled={false}
        reactKeyFieldName="userGroupUuid"
      />
    </Accordion>
  );
};

export default UserGroupListSection;
