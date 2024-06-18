import { ReactElement } from "react";
import { Trans } from "react-i18next";
import { Typography } from "@mui/material";

const DefaultLoadingView = (): ReactElement => {
  return (
    <Typography
      variant="body2"
      className="py-6 text-center"
      data-testid="loading"
    >
      <Trans i18nKey="DataTable.status.loading" />
    </Typography>
  );
};

export default DefaultLoadingView;
