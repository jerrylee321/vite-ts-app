import { ReactElement, useCallback, useState } from "react";
import { Button, Input, InputProps } from "@mui/material";
import cn from "classnames";

import { ReactComponent as EyeIcon } from "../../assets/icons/ic_eye.svg";
import { ReactComponent as EyeSlashIcon } from "../../assets/icons/ic_eye_slash.svg";
import { ReactComponent as LockIcon } from "../../assets/icons/ic_lock.svg";

const AuthPasswordInput = (
  props: InputProps & {
    showStartAdornment?: boolean;
  }
): ReactElement => {
  const { className, inputProps, showStartAdornment = true, ...rest } = props;
  const [reveal, setReveal] = useState(false);
  const handleToggle = useCallback(() => {
    setReveal((value) => {
      return !value;
    });
  }, []);

  const RevealIcon = reveal ? EyeIcon : EyeSlashIcon;
  return (
    <Input
      {...rest}
      inputProps={{
        ...inputProps,
        className: "placeholder:italic",
      }}
      className={cn("bg-white px-2 py-0 pt-1 before:border-b-0", className)}
      startAdornment={
        showStartAdornment ? (
          <LockIcon className="mr-1 h-8 w-8 pb-1" />
        ) : undefined
      }
      endAdornment={
        <Button
          onClick={handleToggle}
          className="min-w-0 p-0"
          data-testid="toggle"
        >
          <RevealIcon className="mr-1 mb-1 h-8 w-8" />
        </Button>
      }
      type={reveal ? "text" : "password"}
    />
  );
};
export default AuthPasswordInput;
