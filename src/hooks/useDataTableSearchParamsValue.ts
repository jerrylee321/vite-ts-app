import { useCallback, useMemo } from "react";
import { TableState } from "react-table";

import removeUndefinedFields from "../utils/removeUndefinedFields";

import useSearchParamsValue from "./useSearchParamsValue";

type NullableTableStatePartial<T extends object> = Partial<
  Pick<TableState<T>, "pageSize" | "pageIndex" | "sortBy">
> | null;

export type SetDataTableSerachParamsValueType<T extends object> = (
  newValue: NullableTableStatePartial<T>
) => void;
export type DataTableSerachParamsValueType<T extends object> =
  NullableTableStatePartial<T>;

const normalize = <T extends object = object>(
  value: NullableTableStatePartial<T>
): NullableTableStatePartial<T> => {
  if (!value) {
    return value;
  }

  // Only the fields in this list can be set via the URL
  const { pageIndex, pageSize, sortBy } = value;

  // Remove undefined such that it should be safe to be spreaded
  return removeUndefinedFields({ pageIndex, pageSize, sortBy });
};

const useDataTableSearchParamsValue = <TData extends object = object>(
  key: string,
  initValue?: DataTableSerachParamsValueType<TData>
): [
  NullableTableStatePartial<TData>,
  (newValue: NullableTableStatePartial<TData>) => void
] => {
  const [_state, _setState] = useSearchParamsValue<
    NullableTableStatePartial<TData>
  >({
    key,
    initValue: initValue ?? null, // null value is used to indicate that value is not set
    isReadOnly: false,
  });

  const state = useMemo(() => normalize(_state), [_state]);

  const setState = useCallback(
    (newState: NullableTableStatePartial<TData>) => {
      _setState(normalize(newState));
    },
    [_setState]
  );
  return [state, setState];
};

export default useDataTableSearchParamsValue;
