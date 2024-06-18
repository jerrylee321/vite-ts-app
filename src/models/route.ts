import { SVGComponent } from "../components/SVGComponent";
import { MessageKey } from "../i18n/LocaleModel";

import { WithUserFunctionMenuFilter } from "./userFunctionMenu";

export type RouteMenuSubItem = WithUserFunctionMenuFilter<{
  path?: string;
  labelMessageKey: MessageKey;
  Icon?: SVGComponent;
  permitNameCode?: string;
}>;

export type RouteMenuItem = WithUserFunctionMenuFilter<{
  path?: string;
  labelMessageKey: MessageKey;
  Icon?: SVGComponent;
  children?: RouteMenuSubItem[];
  groupNameCode?: string;
  permitNameCode?: string;
}>;

export interface RouteMenuResult {
  isLoading: boolean;
  error: unknown;
  data: RouteMenuItem[];
}
