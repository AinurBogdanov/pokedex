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
  stats: Stat[];
  weight: number;
  height: string;
  id: number;
  order: number;

  abilities: Abilities[];
  types: Type[];
};

export type PokemonShortInfo = Pick<Pokemon, 'name'> & {
  url: string;
};
type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};
type Abilities = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};
type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};
