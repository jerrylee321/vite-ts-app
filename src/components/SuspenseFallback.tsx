import React, { ReactElement } from "react";

export const LoadingScreenTestId = "loadingScreen";
const SuspenseFallback = (): ReactElement => {
  return (
    <main
      data-testid={LoadingScreenTestId}
      className="h-full w-full bg-background-default"
    />
  );
};

export default SuspenseFallback;
