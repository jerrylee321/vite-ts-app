import { PropsWithChildren, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "@mui/material";
import Accordion from "frontend-common/src/components/Accordion";

import CaseDetailContent, { CaseDetail } from "../CaseDetailContent";

interface CaseDetailSectionProps extends PropsWithChildren {
  detail: CaseDetail;
  collapsible?: boolean;
}

const CaseDetailSection = (props: CaseDetailSectionProps): ReactElement => {
  const { detail, collapsible, children } = props;
  const { t } = useTranslation();

  const content = (
    <>
      <CaseDetailContent className="mb-4" detail={detail} />
      {children ? (
        <>
          <Divider className="my-4" />
          {children}
        </>
      ) : null}
    </>
  );

  return (
    <Accordion
      title={t("CaseDetailSection.title")}
      collapsible={collapsible}
      disableGutters={true}
    >
      {content}
    </Accordion>
  );
};

export default CaseDetailSection;
export type { CaseDetail };
