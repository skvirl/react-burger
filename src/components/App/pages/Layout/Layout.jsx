import { Outlet, useNavigate } from "react-router-dom";
import AppHeader from "../../../AppHeader/AppHeader";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={styles.layout}>
      <AppHeader />
      <Outlet />
    </div>
  );
}

export default Layout;
