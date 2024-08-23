import { useState, useEffect } from 'react';
import { useFetchCocktails } from '../hooks';
import axios from 'axios';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export const useCocktailSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cocktailsPerPage, setCocktailsPerPage] = useState<number>(8);
  const [maxPagesToShow, setMaxPagesToShow] = useState<number>(5); // 5 páginas por defecto
  const [selectedCocktailId, setSelectedCocktailId] = useState<string | null>(null);

  const fetchCocktails = useFetchCocktails();

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm) {
        const fetchedCocktails = await fetchCocktails(searchTerm);
        setCocktails(fetchedCocktails);
      } else {
        const defaultCocktails = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
        setCocktails(defaultCocktails.data.drinks);
      }
    };

    fetchResults();
  }, [searchTerm, fetchCocktails]);

  useEffect(() => {
    const updateCocktailsPerPage = () => {
      const isMobile = window.innerWidth < 768;
      setCocktailsPerPage(isMobile ? 4 : 8);
      setMaxPagesToShow(isMobile ? 3 : 5); // Actualiza páginas para mostrarlas según el tamaño de la pantalla
    };

    window.addEventListener('resize', updateCocktailsPerPage);
    updateCocktailsPerPage();

    return () => window.removeEventListener('resize', updateCocktailsPerPage);
  }, []);

  const indexOfLastCocktail = currentPage * cocktailsPerPage;
  const indexOfFirstCocktail = indexOfLastCocktail - cocktailsPerPage;
  const currentCocktails = cocktails.slice(indexOfFirstCocktail, indexOfLastCocktail);

  const totalPages = Math.ceil(cocktails.length / cocktailsPerPage);

  return {
    searchTerm,
    setSearchTerm,
    currentCocktails,
    currentPage,
    totalPages,
    maxPagesToShow,
    setCurrentPage,
    selectedCocktailId,
    setSelectedCocktailId,
  };
};
