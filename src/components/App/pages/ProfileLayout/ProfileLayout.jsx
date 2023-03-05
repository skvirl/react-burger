import { Outlet, useNavigate } from "react-router-dom";
import AppHeader from "../../../AppHeader/AppHeader";
import styles from "./ProfileLayout.module.css";
import { ProfileNav } from "../../../ProfileNav/ProfileNav";

function ProfileLayout() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <ProfileNav />
        <div className={styles.layout}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;
