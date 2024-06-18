import { ReactElement, useCallback, useMemo } from "react";
import Highlighter from "react-highlight-words";
import { useTranslation } from "react-i18next";
import type { CellProps } from "react-table";
import { isDate, isValid as isValidDate } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { TFuncKey } from "i18next";

import useTimeZone from "../../hooks/useTimeZone";

const DefaultCell = <Type extends object>({
  value,
  state,
  column,
}: CellProps<Type>): ReactElement => {
  const { i18n, t } = useTranslation();
  const timeZone = useTimeZone();

  const exists = useCallback(
    (v: string): v is TFuncKey => i18n.exists(v),
    [i18n]
  );

  // eslint-disable-next-line complexity, sonarjs/cognitive-complexity
  const displayValue = useMemo<string | null>(() => {
    try {
      if (value == null) {
        return null;
      } else if (isDate(value) && isValidDate(value)) {
        return formatInTimeZone(
          value,
          timeZone,
          column.dateFormat ?? "dd/MM/yyyy HH:mm:ss"
        );
      } else if (typeof value === "boolean") {
        const i18nKey = column.i18nValueMap?.[value.toString()];
        if (i18nKey && exists(i18nKey)) {
          return t(i18nKey);
        }
        return value ? t("DefaultCell.trueValue") : t("DefaultCell.falseValue");
      } else if (typeof value === "number") {
        return value.toString();
      } else if (typeof value === "string") {
        const i18nKey = column.i18nValueMap?.[value];
        if (i18nKey && exists(i18nKey)) {
          return t(i18nKey);
        }
        if (column.lookup) {
          return column.lookup(value);
        }
        return value;
      }

      return value.toString();
    } catch (err: unknown) {
      console.warn("error formatting readonly text field:", err);
      return null;
    }
  }, [column, exists, t, timeZone, value]);

  return (
    <Highlighter
      highlightClassName="highlight"
      searchWords={[state.globalFilter]}
      autoEscape={true}
      textToHighlight={displayValue ?? t("DefaultCell.emptyValue")}
      className={column.className}
    />
  );
};

export default DefaultCell;
