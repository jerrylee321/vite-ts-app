import { ReactElement } from "react";
import { Input, InputProps } from "@mui/material";
import cn from "classnames";

import { ReactComponent as UserIcon } from "../../assets/icons/ic_user.svg";

const AuthUsernameInput = (props: InputProps): ReactElement => {
  const { className, inputProps, ...rest } = props;

  return (
    <Input
      {...rest}
      inputProps={{
        ...inputProps,
        className: "placeholder:italic",
      }}
      className={cn("bg-white px-2 py-0 pt-1 before:border-b-0", className)}
      startAdornment={<UserIcon className="mr-1 mb-1 h-8 w-8" />}
    />
  );
};
export default AuthUsernameInput;
