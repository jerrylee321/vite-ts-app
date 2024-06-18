import { ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import { MessageKey } from "../../i18n/LocaleModel";
import ReadOnlyTextFieldTable, {
  ReadOnlyTextFieldTableCellProp,
} from "../ReadOnlyTextFieldTable";

export interface CaseDetail {
  requestType: string | undefined | null;
  submissionDate: Date | undefined | null;
  referenceNumber: string | undefined | null;
  status: string | undefined | null;
}

type TranslatableStatus =
  | "Approved"
  | "Rejected"
  | "Submitted"
  | "SystemRejected";

const statusMessageKeyMap: {
  [key in TranslatableStatus]: MessageKey | undefined;
} = {
  Approved: "CaseDetailContent.requestStatus.approved",
  Rejected: "CaseDetailContent.requestStatus.rejected",
  Submitted: "CaseDetailContent.requestStatus.submitted",
  SystemRejected: "CaseDetailContent.requestStatus.systemRejected",
};

interface CaseDetailContentProps {
  className?: string;
  detail: CaseDetail;
}

const CaseDetailContent = (props: CaseDetailContentProps): ReactElement => {
  const { detail, className } = props;
  const { t } = useTranslation();
  const dataSet: ReadOnlyTextFieldTableCellProp[] = useMemo(() => {
    return [
      {
        label: t("CaseDetailContent.requestType"),
        value: detail.requestType,
      },
      {
        label: t("CaseDetailContent.submissionDate"),
        value: detail.submissionDate,
        dateFormat: "dd/MM/yyyy",
      },
      {
        label: t("CaseDetailContent.referenceNumber"),
        value: detail.referenceNumber,
      },
      {
        label: t("CaseDetailContent.requestStatus"),
        value: detail.status,
        i18nValueMap: statusMessageKeyMap,
      },
    ];
  }, [t, detail]);

  return (
    <ReadOnlyTextFieldTable
      className={cn("grid grid-cols-4 gap-4", className)}
      defaultValue="-"
      dataSet={dataSet}
    />
  );
};

export default CaseDetailContent;
