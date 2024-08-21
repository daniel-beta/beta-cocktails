import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Paginator from '../components/Paginator';
import CocktailModal from '../components/CocktailModal';
import { useFetchCocktails } from '../hooks/useFetchCocktails';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

const CocktailSearchPage: React.FC = () => {
  const { t, i18n } = useTranslation();
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

  const changeLanguage = (lng: string) => { i18n.changeLanguage(lng) };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t("searchTitle")}</h1>
        <div>
          <button onClick={() => changeLanguage("es")} className="mr-2">
            Español
          </button>
          <button onClick={() => changeLanguage("en")} className="mr-2">
            English
          </button>
          <button onClick={() => changeLanguage("de")} className="mr-2">
            Deutsch
          </button>
          <button onClick={() => changeLanguage("fr")} className="mr-2">
            Français
          </button>
          <button onClick={() => changeLanguage("it")} className="mr-2">
            Italiano
          </button>
        </div>
      </div>
      <input
        type="text"
        placeholder={t("searchPlaceholder")}
        className="border p-2 mb-4 w-full rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentCocktails.length > 0 ? (
          currentCocktails.map((cocktail) => (
            <div
              key={cocktail.idDrink}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedCocktailId(cocktail.idDrink)}
            >
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className="w-full h-48 object-cover min-h-72"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{cocktail.strDrink}</h2>
              </div>
            </div>
          ))
        ) : (
          <p>{t("noCocktailsFound", { term: searchTerm })}</p>
        )}
      </div>
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
