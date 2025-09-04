import { useParams } from 'react-router';
import styles from './PokemonPage.module.scss';
import { usePokemonByName } from '../../hooks/queries/pokemon';

export function PokemonPage() {
  const params = useParams();

  const { data, isLoading } = usePokemonByName(params.name);

  if (isLoading || !data) return;

  const pokemon = data.data;
  console.log(pokemon);
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
            <p>stats</p>
          </div>
        </div>

        <div>
          <div className={styles.description}>
            description description description description description description description
            description description description description description
          </div>
          <div className={styles.info}>
            <div className={styles.paramBlock}>
              <p className={styles.key}>Height</p>
              <p className={styles.value}>7'04"</p>
            </div>
            <div className={styles.paramBlock}>
              <p className={styles.key}>Category</p>
              <p className={styles.value}>Seed</p>
            </div>
            <div className={styles.paramBlock}>
              <p className={styles.key}>Weight</p>
              <p className={styles.value}>7'04"</p>
            </div>
            <div className={styles.paramBlock}>
              <p className={styles.key}>Abilities</p>
              <p className={styles.ability}>Overgrow</p>
              <p className={styles.ability}>Overgrow</p>
            </div>
          </div>
          <p className="h3">Type</p>
          <div className={styles.types}>
            <p className={styles.type}>Grass</p>
            <p className={styles.type}>Grass</p>
          </div>
        </div>
      </div>
    </div>
  );
}
