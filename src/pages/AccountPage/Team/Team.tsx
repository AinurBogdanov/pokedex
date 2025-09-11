import { useSelector } from 'react-redux';
import { selectTeam } from '../../../redux/user/userSlice';
import styles from './Team.module.scss';
import { useAllPokemonsByIds } from '../../../hooks/queries/pokemon';

export function Team() {
  const teamIds = useSelector(selectTeam);
  console.log(teamIds);
  const res = useAllPokemonsByIds(teamIds);
  const team = res.map((pokemonRes) => {
    return pokemonRes?.data?.data;
  });

  if (!team || team.length === 0) return '';

  return (
    <div>
      <h1>Team</h1>
      <div className={styles.teamContainer}>
        {team.map((pokemon) => {
          if (!pokemon) return 'Pokemon not found';

          return (
            <div className={styles.teamPokemon}>
              <div className={styles.imageCont}>
                <img
                  src={pokemon.sprites.front_default}
                  alt="pokemon"
                  className={styles.pokemonImage}
                />
              </div>
              <div className={styles.pokemonInfo}>
                <div className={styles.pokemonName}>{pokemon.name}</div>
                <div className={styles.types}>
                  {pokemon.types.map((type) => {
                    return (
                      <span key={type.type.name} className={styles.type + ' ' + type.type.name}>
                        {type.type.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

{
  /* <div className={styles.pokemonInfo}>
            <div className={styles.stats}>
              <p className={styles.statHeading}>Stats:</p>
              <div>
                <div>hp : 65</div>
                <div className={styles.underLine}></div>
              </div>
              <div>
                <div>damage : 25</div>
                <div className={styles.underLine}></div>
              </div>
              <div>
                <div>speed : 75</div>
                <div className={styles.underLine}></div>
              </div>
              <div>
                <div>grow time : 15</div>
                <div className={styles.underLine}></div>
              </div>

              <p className={styles.statHeading}>Abilities:</p>
              <div>
                <div>Overgrow</div>
                <div className={styles.underLine}></div>
              </div>
            </div>
          </div> */
}
{
  /* {allPokemonInfo.types.map((type) => {
            return (
              <span key={type.type.name} className={styles.type + ' ' + type.type.name}>
              {type.type.name}
              </span>
              );
              })} */
}
{
  /* {allPokemonInfo.abilities.map((abil) => {
            return (
              <div key={abil.ability.name}>
                <div>{abil.ability.name}</div>
                <div className={styles.underLine}></div>
              </div>
            );
          })} */
}
{
  /* {allPokemonInfo.stats.map((stat) => {
            return (
              <div key={stat.stat.name}>
                <div>
                  {stat.stat.name} : {stat.base_stat}
                </div>
                <div className={styles.underLine}></div>
              </div>
            );
          })} */
}
