import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <select
      onChange={handleChangeLanguage}
      className="border p-2 rounded-md"
      defaultValue={i18n.language}
    >
      <option value="es">Español 🇨🇴</option>
      <option value="en">English 🇺🇸</option>
      <option value="de">Deutsch 🇩🇪</option>
      <option value="fr">Français 🇫🇷</option>
      <option value="it">Italiano 🇮🇹</option>
    </select>
  );
};

export default LanguageSelector;
