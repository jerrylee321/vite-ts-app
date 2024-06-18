import { RouteObject } from "react-router-dom";

import {
  Props as ScreenBlockerProps,
  ScreenBlocker,
} from "../components/ScreenBlocker";
import RequirePermissionRouteProvider from "../providers/RequirePermissionRouteProvider";

export type WithPermissionType<T extends RouteObject> = T &
  Partial<{
    children: WithPermissionType<NonNullable<T["children"]>[number]>[];
    groupNameCode: string;
    permitNameCode: string;
    screenBlockerProps?: ScreenBlockerProps;
  }>;

export function provideRequirePermissionRouteProvider<
  BaseRouteObject extends RouteObject,
  RouteObjectWithPermission extends WithPermissionType<BaseRouteObject>
>(
  routeObject: RouteObjectWithPermission,
  defaultScreenBlockerProps: ScreenBlockerProps
): BaseRouteObject {
  const { element, groupNameCode, permitNameCode, screenBlockerProps } =
    routeObject;

  if (groupNameCode && permitNameCode && element) {
    return {
      ...routeObject,
      element: (
        <RequirePermissionRouteProvider
          groupNameCode={groupNameCode}
          permitNameCode={permitNameCode}
        >
          <ScreenBlocker {...(screenBlockerProps ?? defaultScreenBlockerProps)}>
            {element}
          </ScreenBlocker>
        </RequirePermissionRouteProvider>
      ),
    };
  }

  return routeObject;
}

export function providerRequirePermissionRouteProviderToRoutes<
  BaseRouteObject extends RouteObject,
  RouteObjectWithPermission extends WithPermissionType<BaseRouteObject>
>(
  routeObjects: RouteObjectWithPermission[],
  defaultScreenBlockerProps: ScreenBlockerProps
): BaseRouteObject[] {
  return routeObjects.map((routeObject) => {
    return {
      ...provideRequirePermissionRouteProvider(
        routeObject,
        defaultScreenBlockerProps
      ),
      children: routeObject.children
        ? providerRequirePermissionRouteProviderToRoutes(
            routeObject.children,
            defaultScreenBlockerProps
          )
        : undefined,
    };
  });
}
