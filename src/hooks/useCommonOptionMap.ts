import { useMemo } from "react";

import { CommonOption } from "../models/option";

const useCommonOptionMap = (data: CommonOption[]): Map<string, string> => {
  return useMemo(() => {
    const map = new Map<string, string>();
    data.forEach((entry) => {
      map.set(entry.key, entry.name);
    });
    return map;
  }, [data]);
};

export default useCommonOptionMap;
