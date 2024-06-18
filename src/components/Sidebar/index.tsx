import { ReactElement, useCallback, useState } from "react";
import cn from "classnames";
import Popup, { bindHover } from "material-ui-popup-state";

import { RouteMenuItem } from "../../models/route";

import CollapseButton from "./CollapseButton";
import CollapsedSubMenu from "./CollapsedSubMenu";
import Drawer from "./Drawer";
import DrawerContent from "./DrawerContent";
import { LinkDrawerItem, TextDrawerItem } from "./DrawerItem";
import UncollapsedSubMenu from "./UncollapsedSubMenu";

interface SidebarProps {
  routeMenu: RouteMenuItem[];
  isLoading?: boolean;
}

const Sidebar = (props: SidebarProps): ReactElement => {
  const { routeMenu, isLoading } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = useCallback((): void => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <Drawer
      variant="permanent"
      open={isOpen}
      data-testid="sideBar"
      classes={{ paper: "relative" }}
    >
      <CollapseButton isCollapsed={isOpen} onClick={toggleDrawer} />
      <DrawerContent
        isOpen={isOpen}
        className={cn({ "opacity-30": isLoading })}
      >
        {routeMenu.map((route) => {
          return (
            <Popup
              key={route.labelMessageKey}
              variant="popover"
              popupId={route.labelMessageKey}
            >
              {(popupState) => {
                const hasSubRoutes = route.children
                  ? route.children.length > 0
                  : false;
                return (
                  <>
                    {route.path && !hasSubRoutes ? (
                      <LinkDrawerItem
                        isIconOnly={!isOpen}
                        path={route.path}
                        Icon={route.Icon}
                        labelMessageKey={route.labelMessageKey}
                      />
                    ) : (
                      <TextDrawerItem
                        isIconOnly={!isOpen}
                        path={route.path}
                        subRoutes={route.children}
                        Icon={route.Icon}
                        labelMessageKey={route.labelMessageKey}
                        popMenuHoverProps={bindHover(popupState)}
                      />
                    )}
                    {hasSubRoutes && isOpen ? (
                      <UncollapsedSubMenu menu={route} />
                    ) : null}
                    {hasSubRoutes && !isOpen ? (
                      <CollapsedSubMenu menu={route} popupState={popupState} />
                    ) : null}
                  </>
                );
              }}
            </Popup>
          );
        })}
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
