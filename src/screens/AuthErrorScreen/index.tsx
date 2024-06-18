import { ReactElement } from "react";

import useShowErrors from "../../hooks/useShowErrors";

interface AuthErrorScreenProps {
  error: unknown;
}

const AuthErrorScreen = ({ error }: AuthErrorScreenProps): ReactElement => {
  useShowErrors([error], { logoutOnDismiss: true });

  return <></>;
};

export default AuthErrorScreen;
