import { useMemo } from "react";

import { CommonOption } from "../models/option";
import { LookupFn } from "../types/lookup";

function useLookupCommonOptionValue(commonOptions: CommonOption[]): LookupFn {
  return useMemo(() => {
    function lookup(value: string): string;
    function lookup(value: string | null): string | null;
    function lookup(value: string | undefined): string | undefined;
    function lookup(
      value: string | null | undefined
    ): string | null | undefined;
    function lookup(
      value: string | null | undefined
    ): string | null | undefined {
      return commonOptions.find((v) => v.key === value)?.name ?? value;
    }

    return lookup;
  }, [commonOptions]);
}

export default useLookupCommonOptionValue;
export type { LookupFn };
