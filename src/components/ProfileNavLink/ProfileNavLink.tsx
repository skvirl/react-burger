import Style from "./ProfileNavLink.module.css";
import { Link, useMatch } from "react-router-dom";
import {FC} from 'react'

const ProfileNavLink : FC<{to:string,children:string}>= ({ to, children }) => {
  return (
    <Link
      to={to}
      className={`text
        text_type_main-default
        ${Style.nav__link}
        ${useMatch({ path: to }) && Style.nav__link_active}`}
    >
      {children}
    </Link>
  );
};
export default ProfileNavLink;
