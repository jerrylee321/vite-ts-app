import React, { ReactElement } from "react";
import { Trans } from "react-i18next";

import { MessageKey } from "../../i18n/LocaleModel";

const AuthLoadingScreen = (): ReactElement => {
  return (
    <main>
      <Trans<MessageKey> i18nKey="AuthLoadingScreen.loading" />
    </main>
  );
};

export default AuthLoadingScreen;
