import React from 'react';
import { Cocktail } from '../types/cocktail';

interface CocktailItemProps {
  cocktail: Cocktail;
  onSelect: (idDrink: string) => void;
}

const CocktailItem: React.FC<CocktailItemProps> = ({ cocktail, onSelect }) => (
  <div
    key={cocktail.idDrink}
    className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
    onClick={() => onSelect(cocktail.idDrink)}
  >
    <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="w-full h-48 object-cover min-h-72" />
    <div className="p-4">
      <h2 className="text-xl font-bold">{cocktail.strDrink}</h2>
    </div>
  </div>
);

export default CocktailItem;
