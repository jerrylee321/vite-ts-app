import i18next, { TFuncKey } from "i18next";

export const existsTranslationKey = (
  i18n: typeof i18next,
  key: string
): key is TFuncKey => {
  return i18n.exists(key);
};
