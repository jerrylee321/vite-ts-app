import React, { PropsWithChildren, ReactElement } from "react";

import HeadlineText from "../HeadlineText";

interface PageTitleProps {
  className?: string;
}

const PageTitle = (props: PropsWithChildren<PageTitleProps>): ReactElement => {
  const { children, className, ...rest } = props;

  return (
    <HeadlineText variant="h1" className={className} {...rest}>
      {children}
    </HeadlineText>
  );
};

export default PageTitle;
