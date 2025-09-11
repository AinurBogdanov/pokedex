import styles from './Team.module.scss';

export function Team() {
  return (
    <div>
      <h1>Team</h1>
      <div className={styles.teamContainer}>
        <div className={styles.teamPokemon}>
          <div className={styles.imageCont}>
            <img
              src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'}
              alt="pokemon"
              className={styles.pokemonImage}
            />
          </div>
          <div className={styles.pokemonInfo}>
            <div className={styles.pokemonName}>bulbasor</div>
            <div className={styles.types}>
              <span className={styles.type + ' poison'}>Poison</span>
            </div>
          </div>
        </div>
        <div className={styles.teamPokemon}>
          <div className={styles.imageCont}>
            <img
              src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png'}
              alt="pokemon"
              className={styles.pokemonImage}
            />
          </div>
          <div className={styles.pokemonInfo}>
            <div className={styles.pokemonName}>bulbasor</div>
            <div className={styles.types}>
              <span className={styles.type + ' poison'}>Poison</span>
            </div>
          </div>
        </div>
        <div className={styles.teamPokemon}>
          <div className={styles.imageCont}>
            <img
              src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'}
              alt="pokemon"
              className={styles.pokemonImage}
            />
          </div>
          <div className={styles.pokemonInfo}>
            <div className={styles.pokemonName}>bulbasor</div>
            <div className={styles.types}>
              <span className={styles.type + ' poison'}>Poison</span>
              <span className={styles.type + ' grass'}>Poison</span>
              <span className={styles.type + ' water'}>Poison</span>
            </div>
          </div>
        </div>
        <div className={styles.teamPokemon}>
          <div className={styles.imageCont}>
            <img
              src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png'}
              alt="pokemon"
              className={styles.pokemonImage}
            />
          </div>
          <div className={styles.pokemonInfo}>
            <div className={styles.pokemonName}>bulbasor</div>
            <div className={styles.types}>
              <span className={styles.type + ' poison'}>Poison</span>
              <span className={styles.type + ' grass'}>Poison</span>
              <span className={styles.type + ' water'}>Poison</span>
            </div>
          </div>
        </div>
        <div className={styles.teamPokemon}>
          <div className={styles.imageCont}>
            <img
              src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png'}
              alt="pokemon"
              className={styles.pokemonImage}
            />
          </div>
          <div className={styles.pokemonInfo}>
            <div className={styles.pokemonName}>bulbasor</div>
            <div className={styles.types}>
              <span className={styles.type + ' poison'}>Poison</span>
              <span className={styles.type + ' grass'}>Poison</span>
              <span className={styles.type + ' water'}>Poison</span>
            </div>
          </div>
        </div>
        <div className={styles.teamPokemon}>
          <div className={styles.imageCont}>
            <img
              src={
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png'
              }
              alt="pokemon"
              className={styles.pokemonImage}
            />
          </div>
          <div className={styles.pokemonInfo}>
            <div className={styles.pokemonName}>bulbasor</div>
            <div className={styles.types}>
              <span className={styles.type + ' poison'}>Poison</span>
              <span className={styles.type + ' grass'}>Poison</span>
              <span className={styles.type + ' water'}>Poison</span>
            </div>
          </div>
        </div>
        <div className={styles.teamPokemon}>
          <div className={styles.imageCont}>
            <img
              src={
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/111.png'
              }
              alt="pokemon"
              className={styles.pokemonImage}
            />
          </div>
          <div className={styles.pokemonInfo}>
            <div className={styles.pokemonName}>bulbasor</div>
            <div className={styles.types}>
              <span className={styles.type + ' poison'}>Poison</span>
              <span className={styles.type + ' grass'}>Poison</span>
              <span className={styles.type + ' water'}>Poison</span>
            </div>
          </div>
        </div>
        <div className={styles.teamPokemon}>
          <div className={styles.imageCont}>
            <img
              src={
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/999.png'
              }
              alt="pokemon"
              className={styles.pokemonImage}
            />
          </div>
          <div className={styles.pokemonInfo}>
            <div className={styles.pokemonName}>bulbasor</div>
            <div className={styles.types}>
              <span className={styles.type + ' poison'}>Poison</span>
              <span className={styles.type + ' grass'}>Poison</span>
              <span className={styles.type + ' water'}>Poison</span>
            </div>
          </div>
        </div>
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
