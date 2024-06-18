import { useMemo } from "react";

import { tomorrowDateInZone } from "../utils/time";

import useTimeZone from "./useTimeZone";

const useTomorrow = (): Date => {
  const timeZone = useTimeZone();
  const tomorrow = tomorrowDateInZone(timeZone);
  // NOTE: Returns the same Date object if the date has not changed.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => tomorrow, [tomorrow.getTime()]);
};

export default useTomorrow;
