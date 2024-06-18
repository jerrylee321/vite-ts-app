import type { AtLeastOneRequiredOptions } from "frontend-common/src/yup/atLeastOneRequired";
import type { DocumentationOptions } from "frontend-common/src/yup/documentation";
import type { MapToOptions } from "frontend-common/src/yup/mapTo";
import * as yup from "yup";

import { MessageKey } from "../i18n/LocaleModel";

/* eslint-disable @typescript-eslint/no-unnecessary-qualifier */

declare module "yup" {
  interface ObjectSchema {
    atLeastOneRequired(
      fields?: string[],
      options: AtLeastOneRequiredOptions = {}
    ): this;
  }

  interface StringSchema {
    hkid(message?: yup.Message): this;
  }

  interface Schema {
    i18nLabel(i18nKey: MessageKey): this;
    mapTo(options: MapToOptions): this;
    documentation(): DocumentationOptions;
    documentation(options: DocumentationOptions): this;
  }
}

export default yup;
