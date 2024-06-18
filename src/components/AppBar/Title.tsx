import type { ReactElement } from "react";
import { Trans } from "react-i18next";
import Typography from "@mui/material/Typography";

import { ReactComponent as LogoIcon } from "../../assets/icons/logo.svg";
import { MessageKey } from "../../i18n/LocaleModel";

const AppBarTitle = (): ReactElement => (
  <div className="flex w-drawer items-center gap-2">
    <LogoIcon />
    <div className="flex flex-col">
      <Typography
        className="whitespace-pre-line font-bold uppercase leading-3 text-inherit"
        variant="caption"
      >
        <Trans<MessageKey> i18nKey="AppBarTitle.appTitle" />
      </Typography>
    </div>
  </div>
);

export default AppBarTitle;
