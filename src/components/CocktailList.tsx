import React from 'react';
import { Cocktail } from '../types/cocktail';
import { CocktailItem } from '.';

interface CocktailListProps {
  cocktails: Cocktail[];
  onSelectCocktail: (idDrink: string) => void;
}

export const CocktailList: React.FC<CocktailListProps> = ({ cocktails, onSelectCocktail }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {cocktails.length > 0 ? (
      cocktails.map((cocktail) => (
        <CocktailItem
          key={cocktail.idDrink}
          cocktail={cocktail}
          onSelect={onSelectCocktail}
        />
      ))
    ) : (
      <p>No cocktails found.</p>
    )}
  </div>
);