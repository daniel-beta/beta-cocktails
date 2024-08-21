import React from "react";
import { useTranslation } from "react-i18next";

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

interface CocktailGridProps {
  cocktails: Cocktail[];
  onCocktailSelect: (id: string) => void;
  searchTerm: string;
}

const CocktailGrid: React.FC<CocktailGridProps> = ({
  cocktails,
  onCocktailSelect,
  searchTerm,
}) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cocktails.length > 0 ? (
        cocktails.map((cocktail) => (
          <div
            key={cocktail.idDrink}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onClick={() => onCocktailSelect(cocktail.idDrink)}
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
  );
};

export default CocktailGrid;
