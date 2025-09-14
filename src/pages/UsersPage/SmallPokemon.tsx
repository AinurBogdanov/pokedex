import styles from './UsersPage.module.scss';
import type { PokemonId } from '../../redux/@types';
import { usePokemonById } from '../../hooks/queries/pokemon';

export function SmallPokemon({ pokemonId }: { pokemonId: PokemonId }) {
  const { isLoading, data: pokemonData, error } = usePokemonById(pokemonId);

  if (pokemonId === -1 || error)
    return (
      <div className={styles.smallPokemon}>
        <div className={styles.placeAddToTeamHolder}>
          <img
            className={styles.imagePlaceholder}
            src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png'}
            alt=""
          />
        </div>
      </div>
    );
  if (isLoading) return 'Loading...';

  const pokemon = pokemonData?.data;
  return (
    <div className={styles.smallPokemon}>
      <img
        className={styles.smallPokemonImage}
        src={pokemon?.sprites.front_default || 'def'}
        alt=""
      />
    </div>
  );
}
