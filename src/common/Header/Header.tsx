import { Link } from 'react-router';
import styles from './Header.module.scss';

export function Header() {
  return (
    <div className={styles.header}>
      <Link className={styles.logoCont} to="/">
        <img className={styles.logo} src="/images/logo.png" alt="logo" />
      </Link>
      <div className={styles.nav}>
        <Link to="/">Pokemons</Link>
        <Link to="/">Another one</Link>
      </div>
    </div>
  );
}
