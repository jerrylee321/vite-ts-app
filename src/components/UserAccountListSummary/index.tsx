import React, { ReactElement } from "react";
import { Trans } from "react-i18next";
import { Divider } from "@mui/material";

interface UserAccountListSummaryProps {
  active: number;
  inactive: number;
  total: number;
}

const UserAccountListSummary = ({
  active,
  inactive,
  total,
}: UserAccountListSummaryProps): ReactElement => {
  return (
    <div className="-mx-8 flex flex-row justify-end gap-8 bg-gray-light px-8 py-4">
      <div className="font-bold text-independence-main">
        <Trans
          i18nKey="UserAccountListSummary.statusStat.active"
          values={{ active }}
        />
      </div>
      <Divider
        className="-my-2 h-10 self-center bg-common-white "
        orientation="vertical"
        flexItem={true}
        sx={{ borderLeftWidth: 1 }}
      />
      <div className="font-bold text-independence-main">
        <Trans
          i18nKey="UserAccountListSummary.statusStat.inactive"
          values={{ inactive }}
        />
      </div>
      <Divider
        className="-my-2 h-10 self-center bg-common-white "
        orientation="vertical"
        flexItem={true}
        sx={{ borderLeftWidth: 1 }}
      />
      <div className="font-bold text-independence-main">
        <Trans
          i18nKey="UserAccountListSummary.statusStat.total"
          values={{ total }}
        />
      </div>
    </div>
  );
};

export default UserAccountListSummary;
