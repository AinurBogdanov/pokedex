import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  fetchPokemonById,
  fetchPokemonByName,
  fetchWithPagination,
} from '../../api/services/pokemonsApi';

export function useInfinitePokemons() {
  return useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: ({ pageParam = 0 }) => fetchWithPagination({ page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}

export function usePokemonByName(name: string | undefined) {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: fetchPokemonByName({ name: name }),
  });
}
export function usePokemonById(id: number | undefined) {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: fetchPokemonById({ id }),
  });
}
