import { defaultTimeZone } from "../models/time";

const useTimeZone = (): string => {
  // NOTE: In the future, this could be changed to return timezone from redux or
  // from system. It is okay to fix it to HKT for now as all
  // users are expected to be in Hong Kong.
  return defaultTimeZone;
};

export default useTimeZone;
