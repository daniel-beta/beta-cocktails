import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import CocktailSearchPage from "./pages/CocktailSearchPage";
import i18n from "./config/i18n";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <CocktailSearchPage />
    </I18nextProvider>
  </StrictMode>
);
