import { api } from '../axiosInstance';
import type { Pokemon, PokemonShortInfo } from '../../types/pokemon';

type PokemonsResponse = {
  count: number;
  previous: string | null;
  next: string | null;
  results: PokemonShortInfo[];
};
export type EvolutionChain = {
  evolution_details: [];
  evolves_to: EvolutionChain[];
  is_baby?: boolean;
  species?: {
    name: string;
    url: string;
  };
};
type Species = {
  flavor_text_entries: [
    {
      flavor_text: string;
    },
  ];
  evolution_chain: {
    url: string;
  };
};

export const fetchWithPagination = async ({
  page = 0,
  limit = 30,
}: {
  page: number;
  limit?: number;
}) => {
  const data = await api<PokemonsResponse>({
    url: `/pokemon?limit=${limit}&offset=${page * limit}`,
    method: 'get',
  });

  return {
    results: data.data.results,
    nextPage: data.data.next ? page + 1 : undefined,
  };
};

export const fetchPokemonById = (id?: number) => {
  if (!id) return Promise.reject('id is not provided');
  return api<Pokemon>({
    url: `/pokemon/${id}`,
    method: 'get',
  });
};

export const fetchPokemonByName = (name: string) => {
  if (!name) return Promise.reject('Name is not provided');
  return api<Pokemon>({
    url: `/pokemon/${name}`,
    method: 'get',
  });
};

export const fetchSpecies = (id: number) => {
  if (!id) return Promise.reject('No id provided');
  return api<Species>({
    url: `/pokemon-species/${id}/`,
    method: 'get',
  });
};
export const fetchEvolution = (url: string) => {
  if (!url) return Promise.reject('No Url provided');
  return api<{ chain: EvolutionChain }>({
    url: url,
    method: 'get',
  });
};
