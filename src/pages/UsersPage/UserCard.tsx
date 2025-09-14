import type { UserId } from '../../redux/@types';
import styles from './UsersPage.module.scss';
import { selectUser } from '../../redux/users/usersSlice';
import { useAppSelector } from '../../redux/store';
import { SmallPokemon } from './SmallPokemon';

export function UserCard({ userId }: { userId: UserId }) {
  const user = useAppSelector((state) => selectUser(state, userId));

  const team = user.team || {};
  const pokemonsIds = Object.keys(team).map((key) => team[key].pokemonId);

  function Pokemons() {
    const pokemonAndPlaceholders = Array.from({ length: 6 }, (_, i) => pokemonsIds[i] ?? -1);

    return pokemonAndPlaceholders.map((id, i) => (
      <SmallPokemon key={id !== -1 ? id : `placeholder-${i}`} pokemonId={id} />
    ));
  }

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
      <div className={styles.userCard__pokemonsCont}>{<Pokemons />}</div>
    </div>
  );
}
