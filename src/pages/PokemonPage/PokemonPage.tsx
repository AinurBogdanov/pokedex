import { useParams } from 'react-router';
import styles from './PokemonPage.module.scss';
import { usePokemonByName } from '../../hooks/queries/pokemon';

export function PokemonPage() {
  const params = useParams();
  const { data, isLoading } = usePokemonByName(params.name);

  if (isLoading || !data) return;
  const pokemon = data.data;

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>
        {pokemon.name} <span className={styles.number}>#{pokemon.id}</span>
      </h1>
      <div className={styles.mainContent}>
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

        <div>
          {/* <div className={styles.description}></div> */}
          <div className={styles.info}>
            <div className={styles.paramBlock}>
              <p className={styles.key}>Height</p>
              <p className={styles.value}>{pokemon.height}`00"</p>
            </div>
            {/* <div className={styles.paramBlock}>
              <p className={styles.key}>Category</p>
              <p className={styles.value}>Seed</p>
            </div> */}
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
              return (
                <p key={type.type.name} className={styles.type}>
                  {type.type.name}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
