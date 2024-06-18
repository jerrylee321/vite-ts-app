import { SVGComponent } from "../components/SVGComponent";
import { MessageKey } from "../i18n/LocaleModel";

import { WithUserFunctionMenuFilter } from "./userFunctionMenu";

export type Submodule = WithUserFunctionMenuFilter<{
  messageKey: MessageKey;
  path?: string;
  pendingCasesKey?: string;
  permitNameCode?: string;
}>;

export type Module = WithUserFunctionMenuFilter<{
  groupNameCode?: string;
  icon?: SVGComponent;
  messageKey: MessageKey;
  path?: string;
  pendingCasesKey?: string;
  permitNameCode?: string;
  submodules?: Submodule[];
}>;
