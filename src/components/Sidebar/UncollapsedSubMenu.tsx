import { ReactElement } from "react";

import { RouteMenuItem } from "../../models/route";

import { LinkDrawerItem, TextDrawerItem } from "./DrawerItem";

interface UncollapsedMenuProps {
  menu: RouteMenuItem;
}

const UncollapsedSubMenu = (props: UncollapsedMenuProps): ReactElement => {
  const { menu } = props;

  return (
    <>
      {menu.children?.map((menuItem) => {
        return menuItem.path ? (
          <LinkDrawerItem
            isIconOnly={false}
            key={menuItem.labelMessageKey}
            isSubMenu={true}
            path={menuItem.path}
            Icon={menuItem.Icon}
            labelMessageKey={menuItem.labelMessageKey}
          />
        ) : (
          <TextDrawerItem
            isIconOnly={false}
            key={menuItem.labelMessageKey}
            isSubMenu={true}
            Icon={menuItem.Icon}
            labelMessageKey={menuItem.labelMessageKey}
          />
        );
      })}
    </>
  );
};

export default UncollapsedSubMenu;
