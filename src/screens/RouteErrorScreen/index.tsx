import React, { ReactElement } from "react";
import { Trans } from "react-i18next";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

import { MessageKey } from "../../i18n/LocaleModel";
import AppRoutes from "../../routes/AppRoutes";

/* istanbul ignore next */
const RouteErrorScreen = (): ReactElement => {
  const error = useRouteError();
  console.error(error);

  return (
    <main>
      <h1>
        <Trans<MessageKey> i18nKey="ErrorScreen.title" />
      </h1>
      <p>
        <Trans<MessageKey> i18nKey="ErrorScreen.message" />
      </p>
      {isRouteErrorResponse(error) ? (
        <p>
          <i>{error.statusText}</i>
        </p>
      ) : null}
      <Link to={AppRoutes.Home.path}>
        <Trans<MessageKey> i18nKey="ErrorScreen.backToHome" />
      </Link>
    </main>
  );
};

export default RouteErrorScreen;
