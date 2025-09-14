import { Link, Route, Routes, useParams } from 'react-router';
import styles from './AccountPage.module.scss';
import { Account } from './Account/Account';
import { Settings } from './Settings/Settings';
import { Team } from './Team/Team';
import { signOutUser } from '../../firebase/api/auth';

export default function AccountPage() {
  const params = useParams();
  const currentPage = params['*']
    ?.split('/')
    .map((c, i) => {
      if (i === 0) {
        return c.charAt(0).toUpperCase() + c.slice(1);
      }
      return c;
    })
    .join(' ');

  function onSignOut(): void {
    if (confirm('do you want to sign out') === true) {
      signOutUser();
    }
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h1 className={styles.h1}>{currentPage === '' ? 'Account' : currentPage}</h1>
      </div>
      <aside className={styles.sideBar}>
        <Link
          to="/account"
          className={
            styles.sideBarLink + (currentPage === '' ? ' ' + styles.sideBarLinkActive : '')
          }
        >
          Account
        </Link>
        <Link
          to="/account/team"
          className={
            styles.sideBarLink + (currentPage === 'Team' ? ' ' + styles.sideBarLinkActive : '')
          }
        >
          Team
        </Link>
        <Link
          to="/account/settings"
          className={
            styles.sideBarLink + (currentPage === 'Settings' ? ' ' + styles.sideBarLinkActive : '')
          }
        >
          Settings
        </Link>

        <button className={styles.signOutBtn + ' btn'} onClick={onSignOut}>
          Sign out
        </button>
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
