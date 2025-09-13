import { useNavigate } from 'react-router';
import { usePokemonById } from '../../../hooks/queries/pokemon';
import type { Pokemon } from '../../../types/pokemon';
import { makeReadble } from '../../../utils/makeReadable';
import styles from '../PokemonPage.module.scss';

export function PokemonPageHeader({ pokemon }: { pokemon: Pokemon }) {
  const navigate = useNavigate();

  const { data: nextPokemonData } = usePokemonById((pokemon?.id as number) + 1);
  const { data: previousPokemonData } = usePokemonById((pokemon?.id as number) - 1);

  return (
    <header className={styles.headerPage}>
      <h1 className={styles.pagePagination}>
        {previousPokemonData ? (
          <span
            onClick={() => navigate(`/pokemon/${previousPokemonData.data.name}`)}
            className={styles.arrowRight}
          >
            <i className={styles.arrowBg}></i>
            <p className={styles.arrowText}>
              <span className={styles.pokemonId}>{makeReadble(pokemon.id - 1)} </span>{' '}
              {previousPokemonData.data.name}
            </p>
          </span>
        ) : (
          <span className={styles.arrowRight}></span>
        )}

        {nextPokemonData ? (
          <span
            onClick={() => navigate(`/pokemon/${nextPokemonData.data.name}`)}
            className={styles.arrowLeft}
          >
            <i className={styles.arrowBg}></i>
            <p className={styles.arrowText}>
              <span className={styles.pokemonId}>{makeReadble(pokemon.id + 1)} </span>{' '}
              {nextPokemonData.data.name}
            </p>
          </span>
        ) : (
          <span className={styles.arrowLeft}></span>
        )}
      </h1>
      <div className={styles.nameAndNumber}>
        {pokemon.name} <span className={styles.number}>{makeReadble(pokemon.id)}</span>
        <div className={styles.roundingRight}></div>
        <div className={styles.roundingLeft}></div>
      </div>
    </header>
  );
}
