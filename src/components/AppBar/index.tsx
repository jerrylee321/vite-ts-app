import { PropsWithChildren, ReactElement } from "react";
import { AppBar as MuiAppBar } from "@mui/material";
import Typography from "@mui/material/Typography";
import cn from "classnames";

import useToday from "../../hooks/useToday";
import { MuiAppBarOverride } from "../../styles/MuiAppBarOverride.module.scss";
import FormattedDate from "../FormattedDate";

import AppBarTitle from "./Title";

type AppBarProps = PropsWithChildren;

const AppBar = ({ children }: AppBarProps): ReactElement => {
  const today = useToday();
  return (
    <MuiAppBar
      className={cn(
        MuiAppBarOverride,
        "z-above-drawer flex min-h-[3rem] flex-row items-center justify-between gap-4 bg-theme-main py-1 px-4 text-theme-contrastText"
      )}
      position="relative"
    >
      <AppBarTitle />
      {children}
      <Typography color="inherit">
        <FormattedDate date={today} dateFormat="d/MM/yyyy" />
      </Typography>
    </MuiAppBar>
  );
};

export default AppBar;
