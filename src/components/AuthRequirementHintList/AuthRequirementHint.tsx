import { ReactElement } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

import { ReactComponent as AlertIcon } from "../../assets/icons/ic_alert.svg";
import { ReactComponent as TickIcon } from "../../assets/icons/ic_tick.svg";
import { MessageKey } from "../../i18n/LocaleModel";

interface AuthRequirementHintProps {
  "data-testid"?: string;
  i18nKey: MessageKey;
  isInvalid: boolean;
}

const AuthRequirementHint = ({
  "data-testid": dataTestId,
  isInvalid,
  i18nKey,
}: AuthRequirementHintProps): ReactElement => {
  const { t } = useTranslation();
  const Icon = isInvalid ? AlertIcon : TickIcon;
  const label = isInvalid
    ? t("AuthRequirementHint.invalid")
    : t("AuthRequirementHint.valid");
  return (
    <div className="my-1 flex" data-testid={dataTestId}>
      <Icon
        data-testid="icon"
        aria-label={label}
        className="mr-2 mt-0.5 shrink-0"
      />
      <Typography className="text-sm text-auth-contrastText">
        <Trans<MessageKey> i18nKey={i18nKey} />
      </Typography>
    </div>
  );
};
export default AuthRequirementHint;
