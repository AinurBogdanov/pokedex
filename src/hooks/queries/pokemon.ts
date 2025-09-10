import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import {
  fetchEvolution,
  fetchPokemonById,
  fetchPokemonByName,
  fetchSpecies,
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

export function usePokemonByName(name?: string) {
  return useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonByName(name!),
    enabled: !!name,
  });
}

export function useAllPokemonsByNames(names?: string[]) {
  // console.log(names);
  return useQueries({
    queries: (names ?? []).map((name) => ({
      queryKey: ['pokemon', name],
      queryFn: () => fetchPokemonByName(name),
      enabled: !!name,
    })),
  });
}

export function usePokemonById(id?: number) {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemonById(id!),
    enabled: !!id,
  });
}

export function usePokemonSpecies(id?: number) {
  return useQuery({
    queryKey: ['species', id],
    queryFn: () => fetchSpecies(id!),
    enabled: !!id,
  });
}
export function useEvolution(url?: string, id?: number) {
  return useQuery({
    queryKey: ['evolution', id],
    queryFn: () => fetchEvolution(url!),
    enabled: !!url && !!id,
  });
}
