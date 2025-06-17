import { Outlet } from "react-router-dom";
import styles from "./Content.module.scss";

function Layout() {
  return (
    <div className={`${styles.appContainer} d-flex flex flex-column`}>
      <div className={`${styles.content} container flex-fill mt-2 p-4`}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
