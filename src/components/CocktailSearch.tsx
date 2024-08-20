import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paginator from './Paginator';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

const CocktailSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cocktailsPerPage, setCocktailsPerPage] = useState<number>(8);
  const [maxPagesToShow, setMaxPagesToShow] = useState<number>(5); // 5 páginas por defecto

  const totalPages = Math.ceil(cocktails.length / cocktailsPerPage);

  const fetchCocktails = async (ingredient: string) => {
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      setCocktails(response.data.drinks || []);
      setCurrentPage(1); // Restablecer a la primera página en una nueva búsqueda
    } catch (error) {
      console.error('Error fetching the cocktail data:', error);
      setCocktails([]); // Restablecer cócteles en caso de error
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchCocktails(searchTerm);
    } else {
      axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic')
        .then(response => {
          setCocktails(response.data.drinks);
        })
        .catch(error => {
          console.error('Error fetching the cocktail data:', error);
        });
    }
  }, [searchTerm]);

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
      <h1 className="text-2xl font-bold mb-4">Cocktail Search</h1>
      <input
        type="text"
        placeholder="Search for a cocktail by ingredient..."
        className="border p-2 mb-4 w-full rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentCocktails.length > 0 ? (
          currentCocktails.map((cocktail) => (
            <div key={cocktail.idDrink} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="w-full h-48 object-cover min-h-72" />
              <div className="p-4">
                <h2 className="text-xl font-bold">{cocktail.strDrink}</h2>
              </div>
            </div>
          ))
        ) : (
          <p>No cocktails found with the ingredient/word "{searchTerm}"</p>
        )}
      </div>
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        maxPagesToShow={maxPagesToShow}
      />
    </div>
  );
};

export default CocktailSearch;
