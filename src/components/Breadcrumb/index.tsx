import React, { ReactElement, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { MessageKey } from "../../i18n/LocaleModel";
import { pop, push } from "../../redux/breadcrumb";

export interface BreadcrumbProps {
  titleMessageKey: MessageKey;
  path?: string;
}

const Breadcrumb = (props: BreadcrumbProps): ReactElement => {
  const { titleMessageKey, path } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const breadcrumb = {
      title: t(titleMessageKey),
      path: path,
    };
    dispatch(push(breadcrumb));

    return () => {
      dispatch(pop());
    };
  }, [dispatch, path, t, titleMessageKey]);

  return <></>;
};

export default Breadcrumb;
