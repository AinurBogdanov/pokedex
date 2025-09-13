import type { UserId } from '../../redux/@types';
import styles from './UsersPage.module.scss';
import { selectUser } from '../../redux/users/usersSlice';
import { useAppSelector } from '../../redux/store';
import { SmallPokemon } from './SmallPokemon';

export function UserCard({ userId }: { userId: UserId }) {
  const user = useAppSelector((state) => selectUser(state, userId));

  const team = user.team || {};
  const pokemonsIds = Object.keys(team).map((key) => team[key].pokemonId);

  return (
    <div className={styles.userCard}>
      <div className={styles.userCard__info}>
        <div className={styles.userCard__imageHolder}>
          <img
            className={styles.userCard__image}
            src={user.photoURL ? user.photoURL : 'some defaut photoUrl'}
          />
        </div>
        <div className={styles.userNameAndEmail}>
          <div className={styles.displayName}>{user.displayName}</div>
          <div className={styles.email}>{user.email}</div>
        </div>
      </div>
      <div className={styles.userCard__pokemonsCont}>
        {pokemonsIds.map((id) => (
          <SmallPokemon key={id} pokemonId={id} />
        ))}
      </div>
    </div>
  );
}
