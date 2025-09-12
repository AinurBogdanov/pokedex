import React from 'react';
import styles from './Mobile.module.scss';
import { Link, useNavigate } from 'react-router';
import { signOutUser } from '../../firebase/api/auth';

export function MobileMenu() {
  const [isActive, setIsActive] = React.useState(false);
  const navigate = useNavigate();

  function handleLinkClick() {
    setIsActive(false);
  }

  function onSignOut() {
    if (confirm('are you sure you want to log out') === true) {
      signOutUser();
      navigate('/auth');
    }
  }

  function toggleOverlay() {
    if (!isActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }

  return (
    <>
      <div
        onClick={toggleOverlay}
        className={styles.burger + ' ' + (isActive ? styles.active : '')}
      >
        <div className={styles.burger__tire}></div>
        <div className={styles.burger__tire}></div>
        <div className={styles.burger__tire}></div>
      </div>

      <div className={styles.mobileMenuContent + ' ' + (isActive ? styles.active : '')}>
        <div className={styles.profileSmall}>
          <div className={styles.profileImageCont}>
            <img
              className={styles.profileImage}
              src="https://i.ibb.co/Z1RyJkBp/IMG-6646.jpg"
              alt=""
            />
          </div>
          <div className={styles.info}>
            <div className={styles.displayName}>Ainur Bogdanov</div>
            <div className={styles.email}>ainurbogdanov69@gmail.com</div>
          </div>
        </div>
        <nav className={styles.mobileNav}>
          <Link onClick={handleLinkClick} className={styles.link} to="account">
            Account
          </Link>
          <Link onClick={handleLinkClick} className={styles.link} to="/">
            Pokemons
          </Link>
          <Link onClick={handleLinkClick} className={styles.link} to="account/team">
            Team
          </Link>
          <Link onClick={handleLinkClick} className={styles.link} to="users">
            Users
          </Link>
          <Link onClick={handleLinkClick} className={styles.link} to="account/settings">
            Settings
          </Link>
        </nav>

        <button onClick={onSignOut} className={styles.logoutBtn}>
          LOGOUT
        </button>
      </div>
    </>
  );
}
