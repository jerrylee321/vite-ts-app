import React, { PropsWithChildren, ReactElement } from "react";
import { Typography } from "@mui/material";
import cn from "classnames";

type VariantType = "h1" | "h2" | "h3" | "h4" | "h5";

interface HeadlineTextProps extends PropsWithChildren {
  variant: VariantType;
  className?: string;
}

const HeadlineText = (props: HeadlineTextProps): ReactElement => {
  const { children, variant, className, ...rest } = props;
  let variantClass = "";
  switch (variant) {
    case "h1":
      variantClass = "text-[42px] text-primary-main uppercase font-light";
      break;
    case "h2":
      variantClass = "text-[26px] text-primary-main font-bold";
      break;
    case "h3":
      variantClass = "text-[22px] text-primary-light font-bold";
      break;
    case "h4":
      variantClass = "text-xl text-primary-main font-medium";
      break;
    case "h5":
      variantClass = "text-sm text-metalicBlue-main font-bold";
      break;
  }
  return (
    <>
      <Typography
        className={cn(variantClass, className)}
        {...rest}
        variant={variant}
      >
        {children}
      </Typography>
    </>
  );
};

export default HeadlineText;
