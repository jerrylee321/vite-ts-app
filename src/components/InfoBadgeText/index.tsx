import React, { PropsWithChildren, ReactElement } from "react";
import { Typography } from "@mui/material";

const InfoBadgeText = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <span
      className="flex flex-col justify-center text-center"
      data-testid="InfoBadge"
    >
      <Typography className="min-w-4 rounded-md bg-lightRed-main px-1 text-[0.5rem] font-bold uppercase text-primary-contrastText">
        {children}
      </Typography>
    </span>
  );
};

export default InfoBadgeText;
