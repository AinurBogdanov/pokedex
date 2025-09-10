import type { EvolutionChain } from '../api/services/pokemonsApi';

function takeOutName(part: any) {
  return part.species.name;
}

export function getAllEvolutions(step: EvolutionChain | undefined, level = 0, result: any[] = []) {
  if (!step) return;

  result.push({ name: takeOutName(step), level });
  if (step.evolves_to.length > 0) {
    step.evolves_to.forEach((nextStep) => {
      getAllEvolutions(nextStep, level + 1, result);
    });
  }
  return result;
}
