import { Screen, waitForElementToBeRemoved } from "@testing-library/react";

import { LoadingScreenTestId } from "../../components/SuspenseFallback";

const waitForLazyLoad = async (lazyLoadScreen: Screen): Promise<void> => {
  return waitForElementToBeRemoved(
    () => lazyLoadScreen.queryByTestId(LoadingScreenTestId),
    {
      timeout: 10000,
    }
  ).catch(() => {
    /* do nothing */
  });
};

export default waitForLazyLoad;
