import { useCallback } from 'react';
import { Cocktail } from '../types/cocktail'
import { useFetchCocktailsByIngredient, useFetchCocktailsByName } from '.';

export const useFetchCocktails = () => {
  const fetchCocktailsByIngredient = useFetchCocktailsByIngredient();
  const fetchCocktailsByName = useFetchCocktailsByName();

  const fetchCocktails = useCallback(async (searchTerm: string) => {
    const [cocktailsByIngredient, cocktailsByName] = await Promise.all([
      fetchCocktailsByIngredient(searchTerm),
      fetchCocktailsByName(searchTerm),
    ]);

    const combinedCocktails: Cocktail[] = [
        ...cocktailsByIngredient,
        ...cocktailsByName.filter((c: { idDrink: string; }) => !cocktailsByIngredient.some((ci: { idDrink: string; }) => ci.idDrink === c.idDrink)),
    ];

    return combinedCocktails;
  }, [fetchCocktailsByIngredient, fetchCocktailsByName]);

  return fetchCocktails;
};