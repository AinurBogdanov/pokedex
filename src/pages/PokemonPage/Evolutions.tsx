import React from 'react';
import { useAllPokemonsByNames, useEvolution } from '../../hooks/queries/pokemon';
import { getAllEvolutions } from '../../utils/evolutions';
import styles from './PokemonPage.module.scss';

export function Evolutions({
  pokemonId,
  evolutionUrl,
}: {
  pokemonId?: number;
  evolutionUrl?: string;
}) {
  const { data: pokemonEvolution } = useEvolution(evolutionUrl, pokemonId);

  const evolutionChain = pokemonEvolution?.data.chain;
  const evolutions = getAllEvolutions(evolutionChain);

  const names = evolutions?.map((step) => {
    return step.name;
  });

  const result = useAllPokemonsByNames(names);

  const evolutionsData = result.map((res) => {
    const { data: pokemonData } = res;
    return pokemonData?.data;
  });

  if (!evolutionsData || evolutionsData.length < 0) return <>Loading...</>;

  return (
    <>
      {' '}
      <div className={styles.evolutions}>
        <p className={styles.evolutionHeading}>Evolutions</p>
        <div className={styles.evolutionContainer}>
          {evolutionsData.map((pokemon, i) => {
            if (!pokemon) return '';
            return (
              <React.Fragment key={pokemon.id}>
                <div key={pokemon.id} className={styles.evolutionEl}>
                  <img
                    className={styles.evolutionPokemonImage}
                    src={pokemon.sprites.other.dream_world.front_default}
                    alt="img"
                  />
                </div>
                {evolutionsData.length !== i + 1 ? (
                  <div className={styles.arrowEvolution}></div>
                ) : (
                  ''
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}
