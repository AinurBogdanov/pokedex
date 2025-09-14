import type { UserInfo } from 'firebase/auth';

export type PokemonId = number;

export type Team = {
  [slot: string]: { level: number; pokemonId: PokemonId };
};

export type UserId = string;
export type LocalUser = {
  city?: string;
  team?: Team;
  darkTheme?: boolean;
} & Partial<UserInfo>;
