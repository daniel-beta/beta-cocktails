import { t } from 'i18next';
import React from 'react';
import LeftArrowIcon from '../assets/LeftArrowIcon';
import RightArrowIcon from '../assets/RightArrowIcon';

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxPagesToShow: number;
}

export const Paginator: React.FC<PaginatorProps> = ({ currentPage, totalPages, onPageChange, maxPagesToShow }) => {
  const pages: number[] = [];

  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-1 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 dark:text-white uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 dark:hover:bg-white/10 active:bg-gray-900/20 dark:active:bg-white/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        <LeftArrowIcon />
        {t("previous")}
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase transition-all ${
              page === currentPage
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md shadow-gray-900/10 dark:shadow-white/10 hover:shadow-lg hover:shadow-gray-900/20 dark:hover:shadow-white/20'
                : 'text-gray-900 dark:text-white hover:bg-gray-900/10 dark:hover:bg-white/10 active:bg-gray-900/20 dark:active:bg-white/20'
            } disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="button"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              {page}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 dark:text-white uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 dark:hover:bg-white/10 active:bg-gray-900/20 dark:active:bg-white/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        {t("next")}
        <RightArrowIcon />
      </button>
    </div>
  );
};
