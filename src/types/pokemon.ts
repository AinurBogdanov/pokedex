export type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
      showdown: {
        front_default: string;
      };
    };
  };
  weight: number;
  id: number;
  abilities: unknown;
  height: string;
};

export type PokemonShortInfo = Pick<Pokemon, 'name'> & {
  url: string;
};
