import React, { ReactElement } from "react";
import { Trans } from "react-i18next";
import { Typography } from "@mui/material";
import cn from "classnames";
import { ReactComponent as MemberIcon } from "frontend-common/src/assets/icons/ic_member.svg";
import HeadlineText from "frontend-common/src/components/HeadlineText";

interface BenefitDetailsTableHeaderProps {
  memberCount?: number;
  className?: string;
}
const BenefitDetailsTableHeader = ({
  memberCount,
  className,
}: BenefitDetailsTableHeaderProps): ReactElement => {
  return (
    <div className={cn(className, "flex flex-col flex-wrap gap-1")}>
      <HeadlineText variant="h2">
        <Trans i18nKey="PaymentRequisitionDetailScreen.benefitDetailsTable.title" />
      </HeadlineText>
      <div className="flex flex-row items-center gap-1 text-primary-main">
        <MemberIcon className="h-6 w-6" />
        <Typography className="text-lg font-bold" variant="h4">
          <Trans
            i18nKey="PaymentRequisitionDetailScreen.benefitDetailsTable.totalMember"
            values={{
              total: memberCount,
            }}
          />
        </Typography>
      </div>
    </div>
  );
};

export default BenefitDetailsTableHeader;
