import React from "react";
import { Trans } from "react-i18next";

import { MessageKey } from "../../i18n/LocaleModel";
import HeadlineText from "../HeadlineText";

interface Props {
  titleBottom?: React.ReactElement | null;
  titleRight?: React.ReactElement | null;
  titleMessageKey: MessageKey;
}

const TitleComplex = (props: Props): React.ReactElement => {
  const { titleBottom, titleMessageKey, titleRight } = props;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <HeadlineText variant="h1">
          <Trans<MessageKey> i18nKey={titleMessageKey} />
        </HeadlineText>
        {titleRight}
      </div>
      {titleBottom}
    </div>
  );
};

export default TitleComplex;
