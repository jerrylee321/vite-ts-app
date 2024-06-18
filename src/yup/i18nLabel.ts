import { Schema } from "yup";

import { MessageKey } from "../i18n/LocaleModel";

/**
 * i18nLabel does not participate in validation, but it marks the field's
 * label in validation docs. It can also be used to display label in form
 * components.
 *
 * This is the same as calling `label` on a schema, but this method checks
 * whether the specified key is valid.
 */
Schema.prototype["i18nLabel"] = function <T extends Schema>(
  this: T,
  i18nKey: MessageKey
): T {
  return this.label(i18nKey);
};
