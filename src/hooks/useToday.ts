import { useMemo } from "react";

import { todayDateInZone } from "../utils/time";

import useTimeZone from "./useTimeZone";

const useToday = (): Date => {
  const timeZone = useTimeZone();
  const today = todayDateInZone(timeZone);
  // NOTE: Returns the same Date object if the date has not changed.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => today, [today.getTime()]);
};

export default useToday;
