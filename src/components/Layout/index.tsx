import React, { ReactElement } from "react";
import Navbar from "frontend-common/src/components/Navbar";
import Sidebar from "frontend-common/src/components/Sidebar";
import { RouteMenuResult } from "frontend-common/src/models/route";

import Config from "../../Config";
import Environment from "../../Environment";
import useShowErrors from "../../hooks/useShowErrors";
import { useAppLayout } from "../../providers/AppLayoutProvider";
import VersionIndicator from "../VersionIndicator";

interface LayoutProps extends React.PropsWithChildren {
  useMenu: () => RouteMenuResult;
  renderSchemeMenu?: boolean;
}

const Layout = (props: LayoutProps): ReactElement => {
  const { useMenu, renderSchemeMenu = true, children } = props;
  const { layoutRef } = useAppLayout();

  const { data: menu, error, isLoading } = useMenu();

  useShowErrors([error]);

  return (
    <div className="flex max-h-screen min-h-screen flex-col bg-background-default">
      <Navbar renderSchemeMenu={renderSchemeMenu} />
      <div className="z-10 flex flex-1 overflow-auto">
        <Sidebar routeMenu={menu} isLoading={isLoading} />
        <div
          className="min-w-0 flex-1 grow overflow-auto p-6 pt-4"
          ref={layoutRef}
        >
          {children}
        </div>
      </div>
      {Config.showVersionNumber.toLowerCase() === "true" ? (
        <VersionIndicator className="z-20" version={Environment.appVersion} />
      ) : null}
    </div>
  );
};

export default Layout;
