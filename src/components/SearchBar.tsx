import { t } from 'i18next';
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchTermChange }) => (
  <div className="relative">
    <input
      type="text"
      placeholder={t("searchPlaceholder")}
      className="border p-2 mb-4 w-full rounded-md pr-10"
      value={searchTerm}
      onChange={(e) => onSearchTermChange(e.target.value)}
    />
    {searchTerm && (
      <button
        className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none"
        onClick={() => onSearchTermChange('')}
      >
        &#10005;
      </button>
    )}
  </div>
);
