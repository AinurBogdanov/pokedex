import { Link } from 'react-router';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/userSlice';

export function Header() {
  const user = useSelector(selectUser);

  return (
    <div className={styles.header}>
      <Link className={styles.logoCont} to="/">
        <img className={styles.logo} src="/images/logo.png" alt="logo" />
      </Link>
      <div className={styles.nav}>
        <Link className={styles.link} to="/">
          Pokemons
        </Link>
        <Link className={styles.link} to="/">
          Pokedex
        </Link>
        <Link className={styles.link + ' ' + styles.accountLink} to="/account">
          Account
          <div className={styles.avatarImageCont}>
            <img
              className={styles.userAvatar}
              src={user.photoURL ? user.photoURL : '/images/avatarPlaceholder.jpg'}
              alt=""
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
