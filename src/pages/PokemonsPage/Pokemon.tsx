import { useNavigate } from 'react-router';
import Skeleton from 'react-loading-skeleton';
import { makeReadble } from '../../utils/makeReadable';
import { usePokemonByName } from '../../hooks/queries/pokemon';
import type { PokemonShortInfo } from '../../types/pokemon';
import styles from './Pokemons.module.scss';
import { useRef, useState } from 'react';

export function Pokemon({ pokemon }: { pokemon: PokemonShortInfo }) {
  const [showInfo, setShowInfo] = useState(false);

  const timerRef = useRef<number | undefined>(undefined);

  const { data, isLoading } = usePokemonByName(pokemon.name);
  const navigate = useNavigate();

  if (isLoading || !data) {
    return <Skeleton className={styles.skeleton} />;
  }

  const allPokemonInfo = data.data;
  function showAllInfo() {
    timerRef.current = setTimeout(() => setShowInfo(true), 1000);
  }

  function hideAllInfo() {
    clearTimeout(timerRef.current);
    setShowInfo(false);
  }
  return (
    <div className={styles.containerHolder}>
      <div
        onMouseEnter={showAllInfo}
        onMouseLeave={hideAllInfo}
        onClick={() => navigate(`/pokemon/${pokemon.name}`)}
        className={styles.pokemonCard}
      >
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
      {showInfo && (
        <div className={styles.allInfo}>
          <div className={styles.imageContAllInfo}>
            <img
              src={allPokemonInfo.sprites.other.showdown.front_default}
              alt="pokemon"
              className={styles.pokemonImageAllInfo}
            />
          </div>
          <div className={styles.types}>
            {allPokemonInfo.types.map((type) => {
              return (
                <span key={type.type.name} className={styles.type + ' ' + type.type.name}>
                  {type.type.name}
                </span>
              );
            })}
          </div>
          <div className={styles.stats}>
            <p className={styles.statHeading}>Stats:</p>
            {allPokemonInfo.stats.map((stat) => {
              return (
                <div key={stat.stat.name}>
                  <div>
                    {stat.stat.name} : {stat.base_stat}
                  </div>
                  <div className={styles.underLine}></div>
                </div>
              );
            })}
            <p className={styles.statHeading}>Abilities:</p>
            {allPokemonInfo.abilities.map((abil) => {
              return (
                <div key={abil.ability.name}>
                  <div>{abil.ability.name}</div>
                  <div className={styles.underLine}></div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
