import React, { ReactElement } from "react";
import { Drawer as MuiDrawer } from "@mui/material";
import { DrawerProps as MuiDrawerProps } from "@mui/material/Drawer";
import cn from "classnames";

interface DrawerProps extends MuiDrawerProps {
  open: boolean;
}

const Drawer = (props: React.PropsWithChildren<DrawerProps>): ReactElement => {
  const { open, children, ...rest } = props;

  return (
    <MuiDrawer
      {...rest}
      PaperProps={{
        className: cn(
          "border-0 shadow-drawer box-border transition-[width,_padding] ease-sharp overflow-visible px-1",
          {
            "w-drawer duration-entering-screen": open,
            "w-12 duration-leaving-screen": !open,
          }
        ),
      }}
      className={cn(
        "transition-[width,_padding] ease-sharp shrink-0 whitespace-no-wrap box-border overflow-visible",
        {
          "w-drawer duration-entering-screen": open,
          "w-12 duration-leaving-screen": !open,
        }
      )}
    >
      {children}
    </MuiDrawer>
  );
};

export default Drawer;
