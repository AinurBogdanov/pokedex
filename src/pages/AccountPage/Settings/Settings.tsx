import { useNavigate } from 'react-router';
import { signOutUser } from '../../../firebase/api/auth';
import styles from '../AccountPage.module.scss';

export function Settings() {
  const navigate = useNavigate();

  function onSignOut() {
    if (confirm('are you sure you want to log out') === true) {
      signOutUser();
      navigate('/auth');
    }
  }

  return (
    <>
      <h1>Settings</h1>
      <button className={styles.signOutButton} onClick={onSignOut}>
        Sign out
      </button>
    </>
  );
}
