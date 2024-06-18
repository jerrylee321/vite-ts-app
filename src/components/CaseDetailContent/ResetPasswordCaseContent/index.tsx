import { ReactElement, useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import HeadlineText from "frontend-common/src/components/HeadlineText";
import ReadOnlyTextFieldTable from "frontend-common/src/components/ReadOnlyTextFieldTable";

type CaseDetail =
  | {
      // For the case for MPFA Portal and Trustee Portal
      userName: string | null;
      userId: string | null;
    }
  | {
      // For the case for ORSO Trustee Portal
      userName: string | null;
      loginName: string | null;
    };

interface ResetPasswordCaseContentProps {
  detail: CaseDetail;
  className?: string;
}

const ResetPasswordCaseContent = (
  props: ResetPasswordCaseContentProps
): ReactElement => {
  const { detail, className } = props;
  const { t } = useTranslation();

  const dataSet = useMemo(() => {
    return [
      {
        label: t("CaseDetailContent.ResetPasswordCaseContent.userName"),
        value: detail.userName,
        "data-testid": "userName",
      },
      "userId" in detail
        ? {
            label: t("CaseDetailContent.ResetPasswordCaseContent.userId"),
            value: detail.userId,
            "data-testid": "userId",
          }
        : {
            label: t("CaseDetailContent.ResetPasswordCaseContent.loginName"),
            value: detail.loginName,
            "data-testid": "loginName",
          },
    ];
  }, [t, detail]);

  return (
    <div className={className}>
      <HeadlineText variant="h2" className="mt-3">
        <Trans i18nKey="CaseDetailContent.ResetPasswordCaseContent.title" />
      </HeadlineText>
      <ReadOnlyTextFieldTable
        dataSet={dataSet}
        className="my-6 grid grid-cols-4 gap-4"
        defaultValue="-"
      />
      <Typography variant="body1">
        <Trans i18nKey="CaseDetailContent.ResetPasswordCaseContent.details.footnote" />
      </Typography>
    </div>
  );
};

export default ResetPasswordCaseContent;
