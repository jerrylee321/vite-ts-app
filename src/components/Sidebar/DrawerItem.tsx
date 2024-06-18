import { ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  matchPath,
  resolvePath,
  To,
  useLocation,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import cn from "classnames";
import type { bindHover } from "material-ui-popup-state";

import { MessageKey } from "../../i18n/LocaleModel";
import { RouteMenuItem } from "../../models/route";
import { SVGComponent } from "../SVGComponent";

import {
  drawerItemButton,
  drawerItemIcon,
  drawerItemLink,
  drawerItemMainText,
  drawerItemSubMenuText,
  drawerItemText,
} from "./index.module.scss";

interface DrawerItemInnerProps {
  Icon?: SVGComponent;
  isIconOnly: boolean;
  isIconSelected: boolean;
  isSubMenu?: boolean;
  labelMessageKey?: MessageKey;
}

const DrawerItemInner = (props: DrawerItemInnerProps): ReactElement => {
  const { Icon, isIconOnly, isIconSelected, isSubMenu, labelMessageKey } =
    props;

  const { t } = useTranslation();

  const label = labelMessageKey ? t(labelMessageKey) : undefined;

  return (
    <>
      <ListItemIcon
        title={label}
        className={cn("mr-2 min-w-6 self-center", drawerItemIcon, {
          "drawerItemIcon--selected": isIconSelected,
        })}
      >
        {Icon ? <Icon className="h-6 w-6" /> : null}
      </ListItemIcon>
      {isIconOnly ? null : (
        <ListItemText
          className={cn(
            isSubMenu ? drawerItemSubMenuText : drawerItemMainText,
            drawerItemText,
            "grow-0 overflow-hidden m-0"
          )}
          primary={label}
        />
      )}
    </>
  );
};

interface LinkDrawerItemProps {
  Icon?: SVGComponent;
  labelMessageKey?: MessageKey;
  path: To;
  isSubMenu?: boolean;
  isIconOnly: boolean;
  popMenuHoverProps?: ReturnType<typeof bindHover>;
}

export const LinkDrawerItem = (props: LinkDrawerItemProps): ReactElement => {
  const {
    path,
    Icon,
    labelMessageKey,
    isIconOnly,
    isSubMenu = false,
    popMenuHoverProps,
  } = props;
  const resolvedPath = useResolvedPath(path, { relative: "path" });
  const matchRoute = useMatch({
    path: resolvedPath.pathname + "/*",
    end: true,
  });

  return (
    <ListItemButton
      component={Link}
      to={path}
      className={cn(
        drawerItemButton,
        drawerItemLink,
        "y-1 flex cursor-pointer items-center rounded px-2 py-1 transition-[width,_padding] last-of-type:mb-0 hover:bg-transparent",
        {
          "mt-3": !isSubMenu,
          "w-drawerItem": !isIconOnly,
        }
      )}
      selected={Boolean(matchRoute)}
      data-testid={path}
      {...popMenuHoverProps}
    >
      <DrawerItemInner
        isIconOnly={isIconOnly}
        isIconSelected={Boolean(matchRoute)}
        Icon={Icon}
        isSubMenu={isSubMenu}
        labelMessageKey={labelMessageKey}
      />
    </ListItemButton>
  );
};

export default LinkDrawerItem;

interface TextDrawerItemProps {
  Icon?: SVGComponent;
  labelMessageKey?: MessageKey;
  isSubMenu?: boolean;
  isIconOnly: boolean;
  path?: To;
  subRoutes?: Omit<RouteMenuItem, "children">[];
  popMenuHoverProps?: ReturnType<typeof bindHover>;
}

export const TextDrawerItem = (props: TextDrawerItemProps): ReactElement => {
  const {
    Icon,
    labelMessageKey,
    isIconOnly,
    isSubMenu = false,
    path,
    subRoutes,
    popMenuHoverProps,
  } = props;

  const location = useLocation();

  const iconSelected = useMemo(() => {
    if (!subRoutes) {
      return false;
    }
    for (const child of subRoutes) {
      if (child.path) {
        const resolvedPath = resolvePath(child.path, location.pathname);
        const matched = matchPath(
          {
            path: resolvedPath.pathname + "/*",
            end: true,
          },
          location.pathname
        );
        if (Boolean(matched)) {
          return true;
        }
      }
    }
    return false;
  }, [location.pathname, subRoutes]);

  return (
    <ListItemButton
      component="div"
      className={cn(
        drawerItemButton,
        "rounded hover:bg-transparent y-1 flex items-center transition-[width,_padding] last-of-type:mb-0 px-2 py-1",
        "cursor-default",
        {
          "mt-3": !isSubMenu,
          "w-drawerItem": !isIconOnly,
        }
      )}
      disableRipple={true}
      data-testid={path}
      {...popMenuHoverProps}
    >
      <DrawerItemInner
        isIconOnly={isIconOnly}
        isIconSelected={iconSelected}
        Icon={Icon}
        isSubMenu={isSubMenu}
        labelMessageKey={labelMessageKey}
      />
    </ListItemButton>
  );
};
