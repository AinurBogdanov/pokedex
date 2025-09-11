import { Link, Route, Routes } from 'react-router';
import styles from './AccountPage.module.scss';
import { Account } from './Account/Account';
import { Settings } from './Settings/Settings';
import { Team } from './Team/Team';

export default function AccountPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h1 className={styles.h1}>Account</h1>
      </div>
      <aside className={styles.sideBar}>
        <Link to="/account" className={styles.sideBarLink + ' ' + styles.sideBarLinkActive}>
          Account
        </Link>
        <Link to="/account/team" className={styles.sideBarLink}>
          Team
        </Link>
        <Link to="/account/settings" className={styles.sideBarLink}>
          Settings
        </Link>
      </aside>

      <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/team" element={<Team />} />
      </Routes>
      {/* <Account /> */}
      {/* <Settings /> */}
      {/* <Team /> */}
    </div>
  );
}
