import { setFormikLocale } from "frontend-common/src/utils/formLocale";
import i18next, { Resource } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ICU from "i18next-icu";

import en from "./translations/en.json";

const resources: Resource = {
  en: {
    translation: en,
  },
};

export const fallbackLanguage = "en";

// eslint-disable-next-line import/no-named-as-default-member
const i18n = i18next.use(ICU).use(LanguageDetector);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n.init({
  resources,
  fallbackLng: fallbackLanguage,
  debug: false,
  returnNull: false,
  keySeparator: ".",
  interpolation: {
    escapeValue: false,
  },
});

setFormikLocale(i18n);

export default i18n;
