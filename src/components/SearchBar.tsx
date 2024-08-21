import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchTermChange }) => (
  <input
    type="text"
    placeholder="Search for a cocktail by name or ingredient..."
    className="border p-2 mb-4 w-full rounded-md"
    value={searchTerm}
    onChange={(e) => onSearchTermChange(e.target.value)}
  />
);

export default SearchBar;
