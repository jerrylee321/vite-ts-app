import { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import Accordion from "frontend-common/src/components/Accordion";
import ReadOnlyTextField from "frontend-common/src/components/ReadOnlyTextField";

interface TrusteeInputSectionProps {
  trusteeComment: string | null;
}

const TrusteeInputSection = ({
  trusteeComment,
}: TrusteeInputSectionProps): ReactElement => {
  const { t } = useTranslation();

  return (
    <Accordion
      className="bg-white"
      collapsible={false}
      title={t("PaymentRequisitionDetailScreen.trusteeInputSection.title")}
    >
      <ReadOnlyTextField
        valueStyle="grayBox"
        label={t(
          "PaymentRequisitionDetailScreen.trusteeInputSection.trusteeComment.label"
        )}
        childTextClassName="whitespace-pre-wrap text-xs min-h-20"
        value={trusteeComment}
        data-testid="trusteeComment"
      />
    </Accordion>
  );
};

export default TrusteeInputSection;
