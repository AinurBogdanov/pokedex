import type { Pokemon, PokemonShortInfo } from '../../types/pokemon';
import styles from './Pokemons.module.scss';
import { useInfinitePokemons, usePokemonByName } from '../../hooks/queries/pokemon';
import { useNavigate } from 'react-router';
import { memo, useEffect, useMemo } from 'react';
import throttle from 'lodash.throttle';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { makeReadble } from '../../utils/makeReadable';

export const PokemonsPage = () => {
  const { data, fetchNextPage } = useInfinitePokemons();

  const throttledFetch = useMemo(
    () => throttle(fetchNextPage, 1000, { trailing: false }),
    [fetchNextPage],
  );

  useEffect(() => {
    function handleScroll() {
      const leftToBottom = document.body.scrollHeight - (window.innerHeight + window.scrollY);
      if (leftToBottom < 200) {
        // console.log('fired');
        throttledFetch();
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage, throttledFetch]);

  const pokemons: PokemonShortInfo[] = useMemo(() => {
    return data?.pages.map((p) => p.results).flat() || [];
  }, [data]);

  const PokemonList = memo(() => {
    return (
      <div className={styles.pokemonsContainer}>
        {pokemons.map((p) => {
          return <Pokemon key={p.name} pokemon={p} />;
        })}
      </div>
    );
  });

  return (
    <div>
      <PokemonList />
    </div>
  );
};

function Pokemon({ pokemon }: { pokemon: PokemonShortInfo }) {
  const { data, isLoading } = usePokemonByName(pokemon.name);
  const navigate = useNavigate();

  if (isLoading || !data) {
    return <Skeleton className={styles.skeleton} />;
  }

  const allPokemonInfo = data.data;

  return (
    <div onClick={() => navigate(`/pokemon/${pokemon.name}`)} className={styles.pokemonCard}>
      <p className={styles.name}>{pokemon.name}</p>

      <div className={styles.pokeCardImageAndId}>
        <div className={styles.imageCont}>
          <img
            src={allPokemonInfo.sprites.front_default}
            alt="pokemon"
            className={styles.pokemonImage}
          />
        </div>
        <p className={styles.pokemonId}>{makeReadble(allPokemonInfo.id)}</p>
      </div>
    </div>
  );
}
