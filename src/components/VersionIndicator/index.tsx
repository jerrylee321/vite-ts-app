import { ReactElement } from "react";
import { Trans } from "react-i18next";
import { Paper, Typography } from "@mui/material";
import cn from "classnames";

interface Props {
  className?: string;
  version?: string;
}

const VersionIndicator = (props: Props): ReactElement | null => {
  const { className, version } = props;

  if (version == null || version === "") {
    return null;
  }
  return (
    <Paper
      data-testid="VersionIndicator"
      className={cn("fixed left-0 bottom-0 m-1 py-1 px-4", className)}
      elevation={1}
    >
      <Typography variant="caption" className="font-semibold">
        <Trans i18nKey="VersionIndicator.version" values={{ version }} />
      </Typography>
    </Paper>
  );
};

export default VersionIndicator;
