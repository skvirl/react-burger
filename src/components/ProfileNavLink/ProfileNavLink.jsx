import Style from "./ProfileNavLink.module.css";
import { Link, useMatch } from "react-router-dom";

const ProfileNavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className={`${Style.nav__link} ${
        useMatch({ path: to }) && Style.nav__link_active
      }`}
    >
      {children}
    </Link>
  );
};
export default ProfileNavLink;
