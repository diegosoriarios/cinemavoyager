import React from "react";

type PaginationProps = {
  items: number,
  pageSize: number,
  currentPage: number,
  onPageChange: (page: number) => void
}

const Pagination = ({ items, pageSize, currentPage, onPageChange } : PaginationProps) => {
  const pagesCount = Math.ceil(items / pageSize);

  if (pagesCount === 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <nav aria-label="Page navigation" className="m-4 flex items-center justify-center">
      <ul className="inline-flex items-center -space-x-px justify-center">
        {currentPage > 1 ? (
          <li>
            <button
              type="button"
              aria-label="Previous page"
              onClick={() => onPageChange(currentPage - 1)}
              className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-gray-300 border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        ) : null}
        {pages.map((page) => (
          <li key={page}>
            <button
              type="button"
              aria-current={page === currentPage ? "page" : undefined}
              className={
                page === currentPage
                  ? "z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  : "px-3 py-2 leading-tight text-gray-500 bg-gray-300 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        {currentPage !== pagesCount ? (
          <li>
            <button
              type="button"
              aria-label="Next page"
              onClick={() => onPageChange(currentPage + 1)}
              className="block px-3 py-2 leading-tight text-gray-500 bg-gray-300 border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};
export default Pagination;
