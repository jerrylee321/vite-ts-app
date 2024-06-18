import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

import { RootState } from "../../redux";

const NavbarSiteMap = (): ReactElement => {
  const breadcrumbs = useSelector(
    (state: RootState) => state.breadcrumb.breadcrumbs
  );
  return (
    <div
      className="flex items-center gap-2"
      aria-label="sitemap"
      color="inherit"
    >
      <ArrowDropDownCircleOutlinedIcon className="h-6 w-6 rotate-90" />
      <Breadcrumbs className="text-common-white" aria-label="route paths">
        {breadcrumbs.map((breadcrumb, index) => {
          const key = `${index}`;
          return breadcrumb.path ? (
            <Link
              key={key}
              to={breadcrumb.path}
              className="text-inherit no-underline"
            >
              <Typography>{breadcrumb.title}</Typography>
            </Link>
          ) : (
            <Typography key={key}>{breadcrumb.title}</Typography>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default NavbarSiteMap;
