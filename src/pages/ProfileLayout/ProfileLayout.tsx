import { Outlet } from "react-router-dom";
import styles from "./ProfileLayout.module.css";
import { ProfileNav } from "../../components/ProfileNav/ProfileNav";

function ProfileLayout() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className='pt-30'>
          <ProfileNav />
        </div>
        <div className={styles.layout}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;
