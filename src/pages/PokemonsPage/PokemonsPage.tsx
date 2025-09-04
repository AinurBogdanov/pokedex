import type { PokemonShortInfo } from '../../types/pokemon';
import styles from './Pokemons.module.scss';
import { useInfinitePokemons, usePokemonByName } from '../../hooks/queries/pokemon';
import { useNavigate } from 'react-router';

export function PokemonsPage() {
  const { data, fetchNextPage, isLoading } = useInfinitePokemons();

  function Pokemon({ pokemon }: { pokemon: PokemonShortInfo }) {
    const { data, isLoading } = usePokemonByName(pokemon.name);
    const navigate = useNavigate();
    if (isLoading || !data) {
      return <>Loading...</>;
    }

    const allPokemonInfo = data.data;

    return (
      <div onClick={() => navigate(`/pokemon/${pokemon.name}`)} className={styles.pokemonCard}>
        <div className={styles.imageCont}>
          <img
            src={allPokemonInfo.sprites.other.showdown.front_default}
            alt="pokemon"
            className={styles.pokemonImage}
          />
        </div>
        <p className={styles.name}>{pokemon.name}</p>
      </div>
    );
  }

  if (isLoading) {
    return <>Loading ...</>;
  }

  const pokemons: PokemonShortInfo[] | undefined = data?.pages.map((p) => p.results).flat();

  return (
    <div>
      <div className={styles.pokemonsContainer}>
        {pokemons && pokemons.length
          ? pokemons.map((p) => {
              return <Pokemon key={p.name} pokemon={p} />;
            })
          : ''}
      </div>

      <button onClick={() => fetchNextPage()}>More</button>
    </div>
  );
}
