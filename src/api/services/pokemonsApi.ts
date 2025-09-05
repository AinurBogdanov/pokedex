import { api } from '../axiosInstance';
import type { Pokemon, PokemonShortInfo } from '../../types/pokemon';

type PokemonsResponse = {
  count: number;
  previous: string | null;
  next: string | null;
  results: PokemonShortInfo[];
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

export const fetchPokemonById =
  ({ id }: { id: number }) =>
  () => {
    return api<PokemonShortInfo>({
      url: `/pokemon/${id}`,
      method: 'get',
    });
  };

export const fetchPokemonByName =
  ({ name }: { name: string | undefined }) =>
  () => {
    if (!name) return;
    return api<Pokemon>({
      url: `/pokemon/${name}`,
      method: 'get',
    });
  };
