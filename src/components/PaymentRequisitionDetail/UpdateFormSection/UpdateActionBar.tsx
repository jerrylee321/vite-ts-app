import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import ActionBar, {
  ActionBarPrimaryButton,
  ActionBarSecondaryButton,
} from "frontend-common/src/components/ActionBar";

interface UpdateActionBarProps {
  handleReset: () => void;
  handleSave: () => void;
  summaryScreenPath: string;
}

const UpdateActionBar = ({
  handleReset,
}: UpdateActionBarProps): ReactElement => {
  const { t } = useTranslation();
  return (
    <ActionBar className="fixed top-auto bottom-0 right-0 w-full">
      <ActionBarSecondaryButton type="reset" onClick={handleReset}>
        {t("PaymentRequisitionDetailScreen.actionBar.action.clear")}
      </ActionBarSecondaryButton>
      <ActionBarPrimaryButton data-testid="FormSubmitButton" type="submit">
        {t("PaymentRequisitionDetailScreen.actionBar.action.submit")}
      </ActionBarPrimaryButton>
    </ActionBar>
  );
};

export default UpdateActionBar;
