import type { PokemonShortInfo } from '../../types/pokemon';
import styles from './Pokemons.module.scss';
import { useInfinitePokemons } from '../../hooks/queries/pokemon';
import { memo, useEffect, useMemo } from 'react';
import throttle from 'lodash.throttle';
import 'react-loading-skeleton/dist/skeleton.css';
import { Pokemon } from './Pokemon';

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
    <div key="pokemonList">
      <PokemonList />
    </div>
  );
};
