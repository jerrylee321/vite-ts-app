import { isEqual as isEqualDate } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import i18next from "i18next";
import { setLocale } from "yup";

import { defaultTimeZone } from "../models/time";

import { existsTranslationKey } from "./i18n";
import { todayDateInDefaultZone, tomorrowDateInDefaultZone } from "./time";

const displayLabelName = (i18n: typeof i18next, label: string): string => {
  return existsTranslationKey(i18n, label)
    ? i18n.t(label)
    : i18n.t("Common.form.validationError.defaultFieldName");
};

const formatDateOrString = (
  i18n: typeof i18next,
  val: string | Date
): string => {
  if (typeof val === "string") {
    return val;
  }

  if (isEqualDate(todayDateInDefaultZone(), val)) {
    return i18n.t("Common.form.validationError.date.today");
  }

  if (isEqualDate(tomorrowDateInDefaultZone(), val)) {
    return i18n.t("Common.form.validationError.date.tomorrow");
  }

  return formatInTimeZone(val, defaultTimeZone, "dd/MM/yyyy");
};

export const setFormikLocale = (i18n: typeof i18next): void => {
  // Config yup validation schema default error message
  setLocale({
    mixed: {
      notType: ({ type, label }) => {
        switch (type) {
          case "date":
            return i18n.t("Common.form.validationError.date.invalidFormat", {
              label: displayLabelName(i18n, label),
            });
          default:
            return i18n.t("Common.form.validationError.general.invalidFormat", {
              label: displayLabelName(i18n, label),
            });
        }
      },
      required: ({ label }) => {
        return i18n.t("Common.form.validationError.required", {
          label: displayLabelName(i18n, label),
        });
      },
      default: (props) => {
        const { test, label } = props;
        // This expects custom validation to have `params: {test: 'testname'}`.
        if (test) {
          const messageKey = `Common.form.validationError.mixed.default.${
            test as string
          }`;
          if (existsTranslationKey(i18n, messageKey)) {
            return i18n.t(messageKey, {
              label: displayLabelName(i18n, label),
            });
          }
        }

        return i18n.t("Common.form.validationError.general.invalidFormat", {
          label: displayLabelName(i18n, label),
        });
      },
    },
    string: {
      max: ({ max, label }) => {
        return i18n.t("Common.form.validationError.string.max", {
          max,
          label: displayLabelName(i18n, label),
        });
      },
      min: ({ min, label }) => {
        return i18n.t("Common.form.validationError.string.min", {
          min,
          label: displayLabelName(i18n, label),
        });
      },
      email: ({ label }) => {
        return i18n.t("Common.form.validationError.string.email", {
          label: displayLabelName(i18n, label),
        });
      },
      length: ({ length, label }) => {
        return i18n.t("Common.form.validationError.string.length", {
          length,
          label: displayLabelName(i18n, label),
        });
      },
      matches: ({ regex, label }) => {
        return i18n.t("Common.form.validationError.string.matches", {
          regex: regex.toString(),
          label: displayLabelName(i18n, label),
        });
      },
    },
    date: {
      min: ({ min, label }) => {
        return i18n.t("Common.form.validationError.date.min", {
          label: displayLabelName(i18n, label),
          min: formatDateOrString(i18n, min),
        });
      },
      max: ({ max, label }) => {
        return i18n.t("Common.form.validationError.date.max", {
          label: displayLabelName(i18n, label),
          max: formatDateOrString(i18n, max),
        });
      },
    },
    number: {
      positive: ({ label }) => {
        return i18n.t("Common.form.validationError.numberic.positiveNumber", {
          label: displayLabelName(i18n, label),
        });
      },
    },
  });
};
