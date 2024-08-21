import { useCallback } from 'react';
import { useFetchCocktailsByIngredient } from './useFetchCocktailsByIngredient';
import { useFetchCocktailsByName } from './useFetchCocktailsByName';
import { Cocktail } from '../types/cocktail'

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
    console.log(combinedCocktails)

    return combinedCocktails;
  }, [fetchCocktailsByIngredient, fetchCocktailsByName]);

  return fetchCocktails;
};