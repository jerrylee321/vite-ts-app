import { ReactElement, useCallback, useState } from "react";
import Button from "@mui/material/Button";

import SelectSchemeDialog from "../SelectSchemeDialog";

interface NavBarSchemeMenuProps {
  schemeName: string;
}

/**
 * @empfPortal mpfa
 * @empfConnMap Overview - Overview
 * @empfScreenID A4
 * @empfComponent
 * @empfDesc It is a menu bar component of scheme menu. It wraps the dialog for
 * showing switching scheme.
 * @empfProp schemeName
 */
const NavBarSchemeMenu = ({
  schemeName,
}: NavBarSchemeMenuProps): ReactElement => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Button
        className="max-w-60 rounded-full bg-primary-dark px-4 py-1"
        onClick={handleOpen}
        data-testid="schemeMenuButton"
      >
        <div
          className="truncate font-bold normal-case text-white"
          title={schemeName}
        >
          {schemeName}
        </div>
      </Button>
      {open ? (
        <SelectSchemeDialog open={true} onClose={handleClose} />
      ) : undefined}
    </>
  );
};

export default NavBarSchemeMenu;
