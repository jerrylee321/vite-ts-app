import React, { ReactElement } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";

export interface AuthDialogProps extends DialogProps {
  open: boolean;
  onClose: () => void;
}

const AuthDialog = (props: AuthDialogProps): ReactElement => {
  const { onClose, children, ...rest } = props;

  return (
    <Dialog
      onClose={onClose}
      classes={{
        paper:
          "overflow-visible w-110 rounded bg-auth-default py-6 px-10 shadow-authBox",
      }}
      {...rest}
    >
      <IconButton
        className="absolute right-0 top-0 h-7 w-7 translate-x-1/2 -translate-y-1/2 bg-red-400"
        onClick={onClose}
      >
        <CloseIcon
          color="error"
          className="absolute stroke-white stroke-2 text-2xl text-white"
        />
      </IconButton>
      {children}
    </Dialog>
  );
};

export default AuthDialog;
