import { useCallback } from 'react';
import axios from 'axios';

export const useFetchCocktailsByIngredient = () => {
  const fetchCocktailsByIngredient = useCallback(async (ingredient: string) => {
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      return response.data.drinks || [];
    } catch (error) {
      console.error('Error fetching cocktails by ingredient:', error);
      return [];
    }
  }, []);

  return fetchCocktailsByIngredient;
};