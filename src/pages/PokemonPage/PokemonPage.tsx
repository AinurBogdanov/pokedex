import { useParams } from 'react-router';
import styles from './PokemonPage.module.scss';
import { usePokemonByName } from '../../hooks/queries/pokemon';
import { PokemonPageHeader } from './PokemonPageHeader/pokemonPageHeader';

export function PokemonPage() {
  const params = useParams();

  const { data, isLoading } = usePokemonByName(params.name);

  const pokemon = data?.data;
  if (isLoading || !data || !pokemon) return;

  return (
    <div className={styles.pageWrap}>
      <PokemonPageHeader pokemon={pokemon} />
      <div className={styles.mainContent}>
        <div className={styles.topContent}>
          <div>
            <div className={styles.imageHolder}>
              <img
                className={styles.image}
                src={pokemon.sprites.other.showdown.front_default}
                alt="Bulbasor"
              />
            </div>
            <div className={styles.stats}>
              <p className={styles.statHeading}>Stats</p>
              <div className={styles.statsBox}>
                {pokemon.stats.map((stat) => {
                  const baseStat = stat.base_stat; // 0 - 100
                  const fullQuantity = Math.floor(baseStat / 10); // baseStat === 68 so fullQuantity = 6 is true ?
                  const emptyQuantity = 10 - fullQuantity;
                  const fullEl = () => {
                    return Array.from({ length: fullQuantity }).map((_, i) => {
                      return <div key={i} className={styles.stateFillFull}></div>;
                    });
                  };
                  const emptyEl = () => {
                    return Array.from({ length: emptyQuantity }).map((_, i) => {
                      return <div key={i} className={styles.stateFillEmpty}></div>;
                    });
                  };
                  return (
                    <div key={stat.stat.name} className={styles.stat}>
                      <div className={styles.statBox}>
                        {emptyEl()}
                        {fullEl()}
                      </div>
                      <span className={styles.statName}>{stat.stat.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.infoBlock}>
            <div className={styles.info}>
              <div className={styles.paramBlock}>
                <p className={styles.key}>Height</p>
                <p className={styles.value}>{pokemon.height}`00"</p>
              </div>

              <div className={styles.paramBlock}>
                <p className={styles.key}>Weight</p>
                <p className={styles.value}>{pokemon.weight} lbs</p>
              </div>
              <div className={styles.paramBlock}>
                <p className={styles.key}>Abilities</p>
                {pokemon.abilities.map((abil) => {
                  return (
                    <p key={abil.ability.name} className={styles.ability}>
                      {abil.ability.name}
                    </p>
                  );
                })}
              </div>
            </div>
            <p className="h3">Type</p>
            <div className={styles.types}>
              {pokemon.types.map((type) => {
                const name = type.type.name as string;
                return (
                  <p key={type.type.name} className={styles.type + ' ' + name}>
                    {name}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.evolutions}>
          <p className={styles.evolutionHeading}>Evolutions</p>
          <div className={styles.evolutionContainer}>
            <div className={styles.evolutionEl}>
              <img
                src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/007.png"
                alt="img"
              />
            </div>
            <div className={styles.arrowEvolution}></div>
            <div className={styles.evolutionEl}>
              <img
                src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/007.png"
                alt="img"
              />
            </div>
            <div className={styles.arrowEvolution}></div>
            <div className={styles.evolutionEl}>
              <img
                src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/detail/007.png"
                alt="img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
