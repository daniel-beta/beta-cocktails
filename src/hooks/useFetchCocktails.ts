import { useCallback } from 'react';
import { Cocktail } from '../types/cocktail';
import { useFetchCocktailsByIngredient, useFetchCocktailsByName } from '.';

export const useFetchCocktails = () => {
  const fetchCocktailsByIngredient = useFetchCocktailsByIngredient();
  const fetchCocktailsByName = useFetchCocktailsByName();

  const fetchCocktails = useCallback(async (searchTerm: string): Promise<Cocktail[]> => {
    try {
      // Ejecuta ambas búsquedas en paralelo
      const [cocktailsByIngredient, cocktailsByName] = await Promise.all([
        fetchCocktailsByIngredient(searchTerm),
        fetchCocktailsByName(searchTerm),
      ]);

      // Combina los resultados y elimina duplicados por idDrink
      const combinedCocktails: Cocktail[] = [
        ...cocktailsByIngredient,
        ...cocktailsByName.filter(
          (c: { idDrink: string; }) => !cocktailsByIngredient.some((ci: { idDrink: string; }) => ci.idDrink === c.idDrink)
        ),
      ];

      return combinedCocktails;
    } catch (error) {
      console.error('Error fetching cocktails:', error);
      return [];
    }
  }, [fetchCocktailsByIngredient, fetchCocktailsByName]);

  return fetchCocktails;
};