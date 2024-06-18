import React, { ReactElement, useMemo } from "react";
import { MessageKey } from "frontend-common/src/i18n/LocaleModel";

import StatusBadge from "../StatusBadge";
import { TransferCaseStatus } from "../TransferCase/models";

interface TransferCaseStatusBadgeProps {
  caseStatus: TransferCaseStatus | undefined;
}

export const TransferCaseStatusBadge = (
  props: TransferCaseStatusBadgeProps
): ReactElement | null => {
  const { caseStatus } = props;

  const statusBadgeMessageId: MessageKey | undefined = useMemo(() => {
    switch (caseStatus) {
      case "Saved":
      case "Scan complete":
      case "Pending":
        return "TransferCaseDetail.statusBadge.caseApproval";
      case "Processing":
        return "TransferCaseDetail.statusBadge.pendingReply";
      default:
        return undefined;
    }
  }, [caseStatus]);

  const statusBadgeBgClassName = useMemo(() => {
    switch (caseStatus) {
      case "Saved":
      case "Scan complete":
      case "Pending":
        return "bg-lightRed-main";
      case "Processing":
        return "bg-cyanBlue-main";
      default:
        return undefined;
    }
  }, [caseStatus]);

  if (statusBadgeMessageId == null) {
    return null;
  }

  return (
    <StatusBadge
      className={statusBadgeBgClassName}
      titleMessageKey={statusBadgeMessageId}
    />
  );
};
