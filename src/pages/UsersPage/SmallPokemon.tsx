import styles from './UsersPage.module.scss';
import type { PokemonId } from '../../redux/@types';
import { usePokemonById } from '../../hooks/queries/pokemon';

export function SmallPokemon({ pokemonId }: { pokemonId: PokemonId }) {
  const { isLoading, data: pokemonData } = usePokemonById(pokemonId);
  if (isLoading) return 'Loading...';

  const pokemon = pokemonData?.data;
  return (
    <div className={styles.smallPokemon}>
      <img className={styles.smallPokemonImage} src={pokemon?.sprites.front_default} alt="" />
    </div>
  );
}
