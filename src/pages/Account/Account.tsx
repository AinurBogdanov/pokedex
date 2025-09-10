import { useSelector } from 'react-redux';
import styles from './Account.module.scss';
import { selectUser } from '../../redux/user/userSlice';
import { Link, useNavigate } from 'react-router';
import { signOutUser } from '../../firebase/api/auth';

export default function Account() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  function onSignOut() {
    if (confirm('are you sure you want to log out') === true) {
      signOutUser();
      navigate('/auth');
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h1 className={styles.h1}>Account</h1>
      </div>
      <aside className={styles.sideBar}>
        <div className={styles.sideBarLink + ' ' + styles.sideBarLinkActive}>
          <a>Account</a>
        </div>
        <div className={styles.sideBarLink}>
          <a>Settings</a>
        </div>
        <div className={styles.sideBarLink}>
          <Link to="/auth">Registration page</Link>
        </div>
      </aside>
      <div className={styles.content}>
        <div className={styles.accountInfo}>
          <div className={styles.accInfoSection}>
            <p className={styles.accountInfoHeading}>Email</p>
            <div className={styles.accInfoCouple}>
              Email address <span className={styles.infoVal}>{user.email}</span>
            </div>
            <div className={styles.accInfoCouple}>
              Phone number
              <span className={styles.infoVal}>
                {user.phoneNumber ? user.phoneNumber : 'unknown'}
              </span>
            </div>
            <div className={styles.accInfoCouple}>
              City
              <span className={styles.infoVal}>{user.city ? user.city : 'unknown'}</span>
            </div>
            {/* <div className={styles.accInfoCouple}>
              Email address <span className={styles.infoVal}>ainurbogdanov50@gmail.com</span>
            </div> */}
          </div>
        </div>

        <div className={styles.personalInfo}>
          <div className={styles.avatarImageCont}>
            <img
              className={styles.avatarImage}
              src={user.photoURL ? user.photoURL : '/images/avatarPlaceholder.jpg'}
              alt=""
            />
          </div>
          <h2>{user.displayName}</h2>
          <div>some info</div>
          <button className={styles.signOutButton} onClick={onSignOut}>
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
