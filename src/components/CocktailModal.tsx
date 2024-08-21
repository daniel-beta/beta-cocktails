import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Cocktail } from '../types/cocktail';
import { t } from 'i18next';
import CloseIcon from '../assets/CloseIcon';

interface CocktailModalProps {
  idDrink: string;
  onClose: () => void;
}

const CocktailModal: React.FC<CocktailModalProps> = ({ idDrink, onClose }) => {
  const { i18n } = useTranslation();
  const [cocktailDetails, setCocktailDetails] = useState<Cocktail | null>(null);

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
        setCocktailDetails(response.data.drinks[0]);
      } catch (error) {
        console.error('Error fetching cocktail details:', error);
      }
    };

    fetchCocktailDetails();
  }, [idDrink]);

  if (!cocktailDetails) return null;

  const generateIngredientsList = () => {
    const ingredientsList = [];

    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktailDetails[`strIngredient${i}` as keyof Cocktail];
      const measure = cocktailDetails[`strMeasure${i}` as keyof Cocktail];

      if (ingredient) {
        ingredientsList.push(`${ingredient} ${measure ? `- ${measure}` : ''}`);
      }
    }

    return ingredientsList;
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Selecciona las instrucciones basadas en el idioma
  const instructions = () => {
    switch (i18n.language) {
      case 'es':
        return cocktailDetails.strInstructionsES;
      case 'de':
        return cocktailDetails.strInstructionsDE;
      case 'fr':
        return cocktailDetails.strInstructionsFR;
      case 'it':
        return cocktailDetails.strInstructionsIT;
      default:
        return cocktailDetails.strInstructions;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center "
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-4 rounded-lg max-w-lg w-full relative">
      <button onClick={onClose} type="button" className="absolute top-3 right-4 size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-200 dark:hover:bg-neutral-400 dark:text-neutral-800 dark:focus:bg-neutral-400" aria-label="Close" data-hs-overlay="#hs-scale-animation-modal">
          <span className="sr-only">Close</span>
          <CloseIcon />
        </button>
        <h2 className="text-2xl font-bold mb-2">{cocktailDetails.strDrink}</h2>
        <img src={cocktailDetails.strDrinkThumb} alt={cocktailDetails.strDrink} className="w-full h-64 object-cover mb-4 rounded-lg" />
        <h3 className="text-xl font-semibold mb-3">{t('ingredients')}</h3>
        <ul className="list-disc ml-5 mb-4">
          {generateIngredientsList().map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        {instructions() && <h3 className="text-xl font-semibold mb-3">{t('instructions')}</h3>}
        <p>{instructions()}</p>
      </div>
    </div>
  );
};

export default CocktailModal;
