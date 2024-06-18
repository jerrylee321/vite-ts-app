import React, { ReactElement } from "react";

import AppBar from "../AppBar";

type AuthLayoutProps = React.PropsWithChildren;

const AuthLayout = (props: AuthLayoutProps): ReactElement => {
  const { children } = props;

  return (
    <div className="flex max-h-screen min-h-screen flex-col bg-auth bg-cover">
      <AppBar />
      <div className="flex flex-1 place-content-center overflow-auto py-4">
        <div className="m-auto w-110 rounded bg-auth-default py-6 px-10 shadow-authBox">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
