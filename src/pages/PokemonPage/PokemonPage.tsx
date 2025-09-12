import { useParams } from 'react-router';
import styles from './PokemonPage.module.scss';
import { usePokemonByName, usePokemonSpecies } from '../../hooks/queries/pokemon';
import { PokemonPageHeader } from './PokemonPageHeader/pokemonPageHeader';
import { Evolutions } from './Evolutions';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../redux/user/userSlice';
import { addToTeam } from '../../firebase/api/db';
import React from 'react';

export function PokemonPage() {
  const params = useParams();
  const userId = useSelector(selectUserId);
  const [addPokemonIsLoading, setAddPokemonIsLoading] = React.useState(false);

  const dispatch = useDispatch();

  const { data: pokemonData, isLoading } = usePokemonByName(params.name);

  const pokemonId = pokemonData?.data.id;
  const { data: speciesData } = usePokemonSpecies(pokemonId);

  const evolutionUrl = speciesData?.data.evolution_chain.url;
  const pokemon = pokemonData?.data;

  if (!pokemon || isLoading || !pokemonData || !speciesData) return <>Loading ...</>;

  ///add motherfucker to team
  async function addMotherfucker(mfId: number) {
    if (!userId) return;
    setAddPokemonIsLoading(true);
    const result = await addToTeam(userId, mfId, dispatch);
    setAddPokemonIsLoading(false);
    if (!result.success) {
      alert(result.message);
    }
  }

  return (
    <div className={styles.pageWrap}>
      <PokemonPageHeader pokemon={pokemon} />
      <div className={styles.mainContent}>
        <div className={styles.topContent}>
          <div>
            <div className={styles.imageHolder}>
              <img
                className={styles.image}
                src={pokemon.sprites.other.dream_world.front_default}
                alt="Bulbasor"
              />
            </div>
            <div className={styles.stats}>
              <p className={styles.statHeading}>Stats</p>
              <div className={styles.statsBox}>
                {pokemon.stats.map((stat) => {
                  const baseStat = stat.base_stat;
                  const fullQuantity = Math.floor(baseStat / 10);
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
            <button
              disabled={addPokemonIsLoading}
              className={styles.addMFButton}
              onClick={() => addMotherfucker(pokemon.id)}
            >
              {addPokemonIsLoading ? 'Loading ...' : 'Add to team'}
            </button>
          </div>
        </div>
        <Evolutions pokemonId={pokemonId} evolutionUrl={evolutionUrl} />
      </div>
    </div>
  );
}
