import React from "react";
import {
  CocktailGrid,
  CocktailModal,
  LanguageSelector,
  Paginator,
  SearchBar,
} from "../components";
import { useCocktailSearch, useDarkMode } from "../hooks";
import { useTranslation } from "react-i18next";

const CocktailSearchPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    searchTerm,
    setSearchTerm,
    currentCocktails,
    currentPage,
    totalPages,
    maxPagesToShow,
    setCurrentPage,
    selectedCocktailId,
    setSelectedCocktailId,
  } = useCocktailSearch();

  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">🍸 {t("searchTitle")}</h1>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="bg-gray-200 dark:bg-gray-800 p-2 rounded-full focus:outline-none"
            >
              {isDarkMode ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
        <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
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
    </div>
  );
};

export default CocktailSearchPage;
