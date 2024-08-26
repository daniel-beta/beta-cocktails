import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      searchTitle: "Cocktail Search",
      searchTitleMobile: "Cocktails",
      searchPlaceholder: "Search for a cocktail by name or ingredient...",
      noCocktailsFound: 'No cocktails found with the term "{{term}}"',
      ingredients: "Ingredients",
      instructions: "Instructions",
      previous: "Previous",
      next: "Next",
    },
  },
  es: {
    translation: {
      searchTitle: "Búsqueda de Cócteles",
      searchTitleMobile: "Cócteles",
      searchPlaceholder: "Busca un cóctel por nombre o ingrediente...",
      noCocktailsFound: 'No se encontraron cócteles con el término "{{term}}"',
      ingredients: "Ingredientes",
      instructions: "Instrucciones",
      previous: "Anterior",
      next: "Siguiente",
    },
  },
  de: {
    translation: {
      searchTitle: "Cocktail-Suche",
      searchTitleMobile: "Cocktails",
      searchPlaceholder: "Suche nach einem Cocktailnamen oder -zutat...",
      noCocktailsFound: 'Keine Cocktails gefunden mit dem Begriff "{{term}}"',
      ingredients: "Zutaten",
      instructions: "Anleitung",
      previous: "Zurück",
      next: "Weiter",
    },
  },
  fr: {
    translation: {
      searchTitle: "Recherche de Cocktails",
      searchTitleMobile: "Cocktails",
      searchPlaceholder: "Cherchez un cocktail par nom ou ingrédient...",
      noCocktailsFound: 'Aucun cocktail trouvé avec le terme "{{term}}"',
      ingredients: "Ingrédients",
      instructions: "Instructions",
      previous: "Précédent",
      next: "Suivant",
    },
  },
  it: {
    translation: {
      searchTitle: "Ricerca Cocktail",
      searchTitleMobile: "Cocktail",
      searchPlaceholder: "Cerca un cocktail per nome o ingrediente...",
      noCocktailsFound: 'Nessun cocktail trovato con il termine "{{term}}"',
      ingredients: "Ingredienti",
      instructions: "Istruzioni",
      previous: "Precedente",
      next: "Successivo",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Idioma por defecto
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
