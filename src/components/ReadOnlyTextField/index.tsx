import { ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import cn from "classnames";
import { isValid } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

import useTimeZone from "../../hooks/useTimeZone";
import { MessageKey } from "../../i18n/LocaleModel";
import { LookupFn } from "../../types/lookup";
import { existsTranslationKey } from "../../utils/i18n";

type ReadOnlyTextFieldCommonProps = {
  id?: string;
  defaultValue?: string;
  "data-testid"?: string;
  className?: string;
  childTextClassName?: string;
  valueStyle?: "plain" | "grayBox";
  isRequired?: boolean;
  helperText?: string | string[];
} & (
  | {
      label: string;
    }
  | {
      labelMessageKey: MessageKey;
    }
);

export type ReadOnlyTextFieldStringProps = ReadOnlyTextFieldCommonProps & {
  value: string | null | undefined;
  i18nValueMap?: { [k in string]: MessageKey | undefined };
  lookup?: LookupFn;
};

export type ReadOnlyTextFieldNumberProps = ReadOnlyTextFieldCommonProps & {
  value: number | null | undefined;
};

export type ReadOnlyTextFieldDateProps = ReadOnlyTextFieldCommonProps & {
  dateFormat: string;
  value: Date | null | undefined;
};

export type ReadOnlyTextFieldAnyProps = ReadOnlyTextFieldCommonProps & {
  value: any;
};

export type ReadOnlyTextFieldProps =
  | ReadOnlyTextFieldDateProps
  | ReadOnlyTextFieldNumberProps
  | ReadOnlyTextFieldStringProps
  | ReadOnlyTextFieldAnyProps;

const isDateProps = (
  props: ReadOnlyTextFieldCommonProps
): props is ReadOnlyTextFieldDateProps => {
  return typeof (props as any).dateFormat === "string";
};

const isNumberProps = (
  props: ReadOnlyTextFieldCommonProps
): props is ReadOnlyTextFieldNumberProps => {
  return typeof (props as any).value === "number";
};

const isStringProps = (
  props: ReadOnlyTextFieldCommonProps
): props is ReadOnlyTextFieldStringProps => {
  return typeof (props as any).value === "string";
};

const ReadOnlyTextField = (props: ReadOnlyTextFieldProps): ReactElement => {
  const { t, i18n } = useTranslation();
  const timeZone = useTimeZone();
  const {
    defaultValue = t("ReadOnlyTextField.label.notApplicable"),
    className,
    childTextClassName,
    "data-testid": dataTestId,
    valueStyle,
    isRequired = false,
  } = props;

  const label = useMemo(() => {
    return "label" in props ? props.label : t(props.labelMessageKey);
  }, [props, t]);

  // eslint-disable-next-line complexity, sonarjs/cognitive-complexity
  const value = useMemo(() => {
    try {
      if (isDateProps(props)) {
        return props.value && isValid(props.value)
          ? formatInTimeZone(props.value, timeZone, props.dateFormat)
          : null;
      }

      if (isNumberProps(props)) {
        return props.value ? props.value.toString() : null;
      }

      if (isStringProps(props)) {
        const i18nKey = props.value
          ? props.i18nValueMap?.[props.value]
          : undefined;
        if (i18nKey && existsTranslationKey(i18n, i18nKey)) {
          return t(i18nKey);
        }
        if (props.lookup) {
          return props.lookup(props.value);
        }
        return props.value ?? null;
      }

      return props.value?.toString() ?? null;
    } catch (err: unknown) {
      console.warn("error formatting readonly text field:", err);
      return null;
    }
  }, [i18n, props, t, timeZone]);

  return (
    <div className={className} data-testid={dataTestId}>
      <div className="flex flex-row gap-1">
        <Typography
          variant="caption"
          className="text-independence-main"
          aria-label={label}
          data-testid={`${dataTestId}Label`}
        >
          {label}
        </Typography>
        {isRequired ? (
          <Typography
            variant="caption"
            className="text-error-main"
            aria-label={label}
            data-testid={`${dataTestId}Label`}
          >
            *
          </Typography>
        ) : null}
      </div>
      <Typography
        className={cn(
          "font-semibold text-independence-main",
          {
            "bg-background-box p-4": valueStyle === "grayBox",
          },
          childTextClassName
        )}
        data-testid={`${dataTestId}Value`}
      >
        {value ?? defaultValue}
      </Typography>
    </div>
  );
};

export default ReadOnlyTextField;
