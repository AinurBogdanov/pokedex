import { useSelector } from 'react-redux';
import styles from './Account.module.scss';
import { selectUser } from '../../redux/user/userSlice';
import { Link } from 'react-router';

export default function Account() {
  const user = useSelector(selectUser);

  console.log(user);
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
          <Link to="/auth"> Страница регистрации </Link>
        </div>
      </aside>
      <div className={styles.content}>
        <div className={styles.accountInfo}>
          <div className={styles.accInfoSection}>
            <p className={styles.accountInfoHeading}>Email</p>
            <div className={styles.accInfoCouple}>
              Email address <span className={styles.infoVal}>{user.email}</span>
            </div>
            {/* <div className={styles.accInfoCouple}>
              Email address <span className={styles.infoVal}>ainurbogdanov50@gmail.com</span>
            </div> */}
          </div>
        </div>

        <div className={styles.personalInfo}>
          <div className={styles.avatarImageCont}>
            <img src="/images/avatarPlaceholder.jpg" alt="" />
          </div>
          <h2>{user.displayName}</h2>
          <div></div>
        </div>
      </div>
    </div>
  );
}
