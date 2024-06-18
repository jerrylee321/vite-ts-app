import { ReactElement } from "react";
import { Typography } from "@mui/material";
import cn from "classnames";

import { ReactComponent as ImportantIcon } from "../../assets/icons/ic_important.svg";

interface AuthImportantMessageViewProps {
  className?: string;
  title: string;
  message?: string | null;
  "data-testid"?: string;
}

const AuthImportantMessageView = ({
  className,
  title,
  message,
  "data-testid": dataTestId,
}: AuthImportantMessageViewProps): ReactElement => {
  return (
    <div
      data-testid={dataTestId}
      className={cn(
        "my-2 flex rounded-lg border border-solid border-lightRed-main bg-error-lightSecondary px-10 py-2 text-metalicBlue-main",
        className
      )}
    >
      <div>
        <ImportantIcon className="mt-1 mr-2 h-6 w-6 self-start" />
      </div>
      <div>
        <Typography className="font-bold" data-testid="title">
          {title}
        </Typography>
        {message ? (
          <Typography className="whitespace-pre-wrap text-sm">
            {message}
          </Typography>
        ) : null}
      </div>
    </div>
  );
};

export default AuthImportantMessageView;
