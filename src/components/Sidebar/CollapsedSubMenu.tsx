import { ReactElement } from "react";
import { Trans } from "react-i18next";
import { Link } from "react-router-dom";
import { MenuItem } from "@mui/material";
import cn from "classnames";
import { bindMenu } from "material-ui-popup-state";
import { PopupState } from "material-ui-popup-state/hooks";
import HoverMenu from "material-ui-popup-state/HoverMenu";

import { MessageKey } from "../../i18n/LocaleModel";
import { RouteMenuItem } from "../../models/route";

interface CollapsedSubMenuProps {
  menu: RouteMenuItem;
  popupState: PopupState;
}

const CollapsedSubMenu = (props: CollapsedSubMenuProps): ReactElement => {
  const { menu, popupState } = props;

  return (
    <HoverMenu
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
      {...bindMenu(popupState)}
    >
      {menu.children?.map((menuItem) => {
        const content = (
          <MenuItem
            className={cn({
              "cursor-default": !menuItem.path,
            })}
            key={menuItem.labelMessageKey}
            onClick={popupState.close}
            data-testid={menuItem.path}
          >
            <Trans<MessageKey> i18nKey={menuItem.labelMessageKey} />
          </MenuItem>
        );
        return menuItem.path ? (
          <Link
            to={menuItem.path}
            className="text-inherit no-underline"
            key={menuItem.labelMessageKey}
          >
            {content}
          </Link>
        ) : (
          content
        );
      })}
    </HoverMenu>
  );
};

export default CollapsedSubMenu;
