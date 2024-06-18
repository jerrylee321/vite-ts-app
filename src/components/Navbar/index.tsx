import { ReactElement, useCallback } from "react";
import { useSelector } from "react-redux";
import { Divider } from "@mui/material";

import { useAuth } from "../../providers/AuthProvider";
import { RootState } from "../../redux";
import AppBar from "../AppBar";

import NavBarSchemeMenu from "./SchemeMenu";
import NavbarSiteMap from "./SiteMap";
import NavBarUserMenu from "./UserMenu";

interface Props {
  renderSchemeMenu: boolean;
}

const Navbar = (props: Props): ReactElement => {
  const { renderSchemeMenu } = props;
  const { currentUser, logout, portal } = useAuth();
  const selectedScheme = useSelector(
    (state: RootState) => state.scheme.selectedScheme
  );

  const handleLogout = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    logout();
  }, [logout]);

  return (
    <>
      <AppBar>
        <NavbarSiteMap />
        <div className="grow" />
        {portal === "trustee" && selectedScheme != null ? (
          <>
            <div
              className="max-w-40 truncate text-common-white"
              title={selectedScheme.trusteeName}
            >
              {selectedScheme.trusteeName}
            </div>
            <Divider
              className="h-8 self-center bg-common-white"
              orientation="vertical"
              flexItem={true}
            />
          </>
        ) : null}
        {renderSchemeMenu && selectedScheme ? (
          <NavBarSchemeMenu schemeName={selectedScheme.schemeName} />
        ) : null}
        {currentUser ? (
          <NavBarUserMenu user={currentUser} onLogout={handleLogout} />
        ) : null}
        <Divider
          className="h-8 self-center bg-common-white"
          orientation="vertical"
          flexItem={true}
        />
      </AppBar>
    </>
  );
};

export default Navbar;
