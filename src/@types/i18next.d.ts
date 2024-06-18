import "i18next";

import enCommon from "../i18n/translations/en.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof enCommon;
    };
  }
}
