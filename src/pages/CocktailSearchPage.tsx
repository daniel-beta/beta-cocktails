import React, { useState, useEffect } from 'react';
import Paginator from '../components/Paginator';
import CocktailModal from '../components/CocktailModal';
import { useFetchCocktails } from '../hooks/useFetchCocktails';
import SearchBar from '../components/SearchBar';
import LanguageSelector from '../components/LenguageSelector';
import CocktailGrid from '../components/CocktailGrid';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

const CocktailSearchPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cocktailsPerPage, setCocktailsPerPage] = useState<number>(8);
  const [maxPagesToShow, setMaxPagesToShow] = useState<number>(5); // 5 páginas por defecto
  const [selectedCocktailId, setSelectedCocktailId] = useState<string | null>(null);
  const totalPages = Math.ceil(cocktails.length / cocktailsPerPage);

  const fetchCocktails = useFetchCocktails(); // Usa el custom hook

  useEffect(() => {
    if (searchTerm) {
      fetchCocktails(searchTerm).then((cocktails) => setCocktails(cocktails));
    } else {
      axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
        .then(response => {
          setCocktails(response.data.drinks);
        })
        .catch(error => {
          console.error('Error fetching the cocktail data:', error);
        });
    }
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🍸 {t("searchTitle")}</h1>
        <LanguageSelector />
      </div>
      <SearchBar 
        searchTerm={searchTerm} 
        onSearchTermChange={setSearchTerm} 
      />
      <CocktailGrid
        cocktails={currentCocktails}
        onCocktailSelect={setSelectedCocktailId}
        searchTerm={searchTerm}
      />
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        maxPagesToShow={maxPagesToShow}
      />
      {selectedCocktailId && (
        <CocktailModal
          idDrink={selectedCocktailId}
          onClose={() => setSelectedCocktailId(null)}
        />
      )}
    </div>
  );
};

export default CocktailSearchPage;
