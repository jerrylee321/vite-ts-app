import React, { ReactElement, ReactNode, useMemo } from "react";
import { Trans } from "react-i18next";
import cn from "classnames";

import { MessageKey } from "../../i18n/LocaleModel";
import Breadcrumb, { BreadcrumbProps } from "../Breadcrumb";
import HeadlineText from "../HeadlineText";

export type ScreenWrapperProps = React.PropsWithChildren & {
  className?: string;
  breadcrumbsProps: BreadcrumbProps[];
  actionComponent?: ReactNode;
  isActionBarExist?: boolean;
} & ({ titleMessageKey: MessageKey } | { title: ReactElement });

const ScreenWrapper = (props: ScreenWrapperProps): ReactElement => {
  const {
    className,
    breadcrumbsProps,
    children,
    actionComponent,
    isActionBarExist = false,
    ...rest
  } = props;

  const title =
    "title" in props ? (
      props.title
    ) : (
      <HeadlineText variant="h1">
        <Trans<MessageKey> i18nKey={props.titleMessageKey} />
      </HeadlineText>
    );

  const restExcludingTitles = useMemo(() => {
    return Object.entries(rest).reduce((result, [key, value]) => {
      if (key === "title" || key === "titleMessageKey") {
        return result;
      }
      return {
        ...result,
        [key]: value,
      };
    }, {});
  }, [rest]);

  return (
    <main
      className={cn(
        "flex flex-col gap-section",
        { "mb-actionBar": isActionBarExist },
        className
      )}
      {...restExcludingTitles}
    >
      {breadcrumbsProps.map((breadcrumb) => (
        <Breadcrumb
          key={breadcrumb.titleMessageKey}
          titleMessageKey={breadcrumb.titleMessageKey}
          path={breadcrumb.path}
        />
      ))}
      <header className="flex flex-col gap-2">
        {title}
        {actionComponent}
      </header>
      {children}
    </main>
  );
};

export default ScreenWrapper;
