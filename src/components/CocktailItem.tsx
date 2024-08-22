import React from 'react';
import { Cocktail } from '../types/cocktail';

interface CocktailItemProps {
  cocktail: Cocktail;
  onSelect: (idDrink: string) => void;
}

export const CocktailItem: React.FC<CocktailItemProps> = ({ cocktail, onSelect }) => (
  <div
    key={cocktail.idDrink}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
    onClick={() => onSelect(cocktail.idDrink)}
  >
    <img
      src={cocktail.strDrinkThumb}
      alt={cocktail.strDrink}
      className="w-full h-48 object-cover min-h-72"
    />
    <div className="p-4">
      <h2 className="text-xl font-bold text-black dark:text-white">{cocktail.strDrink}</h2>
    </div>
  </div>
);
