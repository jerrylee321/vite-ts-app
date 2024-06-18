import React, { ReactElement, useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import cn from "classnames";

export type DialogButtonStyle = "primary" | "secondary" | "important";

export interface DialogControlProps {
  id?: string;
  text: string;
  style: DialogButtonStyle;
  type?: "button" | "submit" | "reset";
  "data-testid"?: string;
  onSelect?: () => void;
  stayOpen?: boolean;
  disabled?: boolean;
  formId?: string;
  className?: string;
}

export interface DialogWithActionsProps extends DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  buttons: DialogControlProps[];
}

interface DialogButtonProps {
  onClose: () => void;
  button: DialogControlProps;
}

const DialogButton = (props: DialogButtonProps): ReactElement => {
  const { onClose, button } = props;
  const { onSelect, style, className, disabled, type, formId, stayOpen, text } =
    button;
  const handleSelect = useCallback(() => {
    onSelect?.();
    if (!stayOpen) {
      onClose();
    }
  }, [onSelect, stayOpen, onClose]);

  return (
    <Button
      data-testid={button["data-testid"]}
      onClick={handleSelect}
      variant={style === "secondary" ? "outlined" : "contained"}
      className={cn(
        "min-w-22 mr-8 last:mr-0 rounded-full h-7 shadow-none text-xs disabled:bg-spanishGray-main disabled:text-gray-main disabled:border-gray-main",
        {
          "bg-dialogActionButton-main": style === "primary",
          "text-dialogActionButton-contrastText":
            style === "primary" || style === "important",
          "bg-dialogActionButton-important": style === "important",
          "border-dialogActionButton-main": style === "secondary",
          "text-dialogActionButton-main": style === "secondary",
          "hover:bg-dialogActionButton-main/10": style === "secondary",
        },
        className
      )}
      disabled={disabled}
      type={type}
      form={formId}
    >
      {text}
    </Button>
  );
};

const DialogWithActions = (props: DialogWithActionsProps): ReactElement => {
  const { onClose, children, title, buttons, ...rest } = props;

  return (
    <Dialog
      onClose={onClose}
      classes={{
        paper: "overflow-visible bg-gray-light min-w-80 min-h-30 rounded-xl",
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
      <div className="flex flex-col overflow-hidden py-6 px-4">
        {title != null ? (
          <div className="mb-6 text-center" data-testid="DialogTitle">
            <Typography variant="h5">{title}</Typography>
          </div>
        ) : null}
        <div
          className={cn("overflow-auto mb-6", {
            "mt-6": title == null,
          })}
          data-testid="DialogBody"
        >
          {children}
        </div>
        <div className="text-center">
          {buttons.map((button, index) => {
            const key = button.id ?? `${index}`;
            return <DialogButton key={key} onClose={onClose} button={button} />;
          })}
        </div>
      </div>
    </Dialog>
  );
};

export default DialogWithActions;
