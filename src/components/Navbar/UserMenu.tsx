import { ReactElement, useCallback } from "react";
import { Trans } from "react-i18next";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import cn from "classnames";
import { bindPopover, bindTrigger } from "material-ui-popup-state";
import { usePopupState } from "material-ui-popup-state/hooks";

import { ReactComponent as ProfileIcon } from "../../assets/icons/profile.svg";
import useDialogState from "../../hooks/useDialogState";
import { MessageKey } from "../../i18n/LocaleModel";
import { User } from "../../models/user";
import { MuiDividerOverride } from "../../styles/MuiDividerOverride.module.scss";
import AuthChangePasswordDialog from "../AuthChangePasswordDialog";

interface NavBarUserMenuProps {
  user: User;
  onLogout?: () => void;
}

/**
 * @empfPortal mpfa
 * @empfConnMap Overview - Overview
 * @empfScreenID A4
 * @empfComponent
 * @empfDesc It is a menu bar component for user menu. It wraps menu item for
 * change password and logout actions.
 * @empfProp user
 * @empfProp onLogout
 *
 * @empfPortal trustee
 * @empfConnMap Overview - Overview
 * @empfScreenID A4
 * @empfComponent
 * @empfDesc It is a menu bar component for user menu. It wraps menu item for
 * change password and logout actions.
 * @empfProp user
 * @empfProp onLogout
 *
 * @empfPortal orso
 * @empfConnMap Overview - Overview
 * @empfScreenID A4
 * @empfComponent
 * @empfDesc It is a menu bar component for user menu. It wraps menu item for
 * change password and logout actions.
 * @empfProp user
 * @empfProp onLogout
 */
const NavBarUserMenu = ({
  user,
  onLogout,
}: NavBarUserMenuProps): ReactElement => {
  const popupState = usePopupState({ variant: "popover" });

  const [
    isChangePasswordDialogOpen,
    openChangePasswordDialog,
    closeChangePasswordDialog,
  ] = useDialogState();

  const handleOpenChangePasswordDialog = useCallback(() => {
    openChangePasswordDialog();
    popupState.close();
  }, [openChangePasswordDialog, popupState]);

  return (
    <>
      <div>
        <Button
          className="flex items-center justify-center rounded-none border-0 p-0 normal-case shadow-none"
          {...bindTrigger(popupState)}
        >
          <ProfileIcon className="mr-2 h-9 w-9 fill-common-white" />
          <Typography
            className="max-w-40 truncate text-common-white"
            title={user.name}
          >
            {user.name}
          </Typography>
        </Button>
        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: -14, horizontal: "left" }}
        >
          <div className="flex w-100 flex-row px-4">
            <ProfileIcon className="my-4 mr-4 h-12 w-12 justify-center self-center fill-primary-main" />
            <div className="w-[calc(100%-3rem-1rem)] self-center ">
              <Typography className="truncate text-lg font-semibold text-independence-main">
                {user.name}
              </Typography>
              <Typography className="truncate text-independence-main">
                {user.email}
              </Typography>
            </div>
          </div>
          <Divider className={cn(MuiDividerOverride, "border-b")} />
          <MenuList>
            <MenuItem onClick={handleOpenChangePasswordDialog}>
              <Typography className="font-bold normal-case text-independence-main">
                <Trans<MessageKey> i18nKey="NavBarUserMenu.changePassword" />
              </Typography>
            </MenuItem>
            <MenuItem onClick={onLogout}>
              <Typography className="font-bold normal-case text-independence-main">
                <Trans<MessageKey> i18nKey="NavBarUserMenu.logout" />
              </Typography>
            </MenuItem>
          </MenuList>
        </Popover>
      </div>
      {isChangePasswordDialogOpen ? (
        <AuthChangePasswordDialog
          open={isChangePasswordDialogOpen}
          onClose={closeChangePasswordDialog}
        />
      ) : null}
    </>
  );
};

export default NavBarUserMenu;
