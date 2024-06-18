import type { ReactElement } from "react";
import { Trans } from "react-i18next";
import type { HeaderProps } from "react-table";

import { MessageKey } from "../../i18n/LocaleModel";

const DefaultHeader = <Type extends object>({
  column,
}: HeaderProps<Type>): ReactElement => {
  return <Trans<MessageKey> i18nKey={column.i18nKey ?? undefined} />;
};

export default DefaultHeader;
