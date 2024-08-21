import { useCallback } from 'react';
import axios from 'axios';

export const useFetchCocktailsByName = () => {
  const fetchCocktailsByName = useCallback(async (name: string) => {
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
      return response.data.drinks || [];
    } catch (error) {
      console.error('Error fetching cocktails by name:', error);
      return [];
    }
  }, []);

  return fetchCocktailsByName;
};