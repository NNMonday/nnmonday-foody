import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPaginationButtons = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((page, index) => (
      <button
        key={index}
        aria-label={`Page ${page}`}
        className={`px-3 py-1 border rounded transition ${
          page === currentPage ? "bg-blue-500 text-white" : "hover:bg-gray-200"
        }`}
        onClick={() => page !== "..." && onPageChange(page)}
        disabled={page === "..." || page === currentPage}
        tabIndex={page === "..." ? -1 : 0}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="flex space-x-2 items-center">
      {currentPage > 1 && (
        <>
          <button
            aria-label="First Page"
            className="px-3 py-1 border rounded hover:bg-gray-200 transition"
            onClick={() => onPageChange(1)}
          >
            First
          </button>
          <button
            aria-label="Previous Page"
            className="px-3 py-1 border rounded hover:bg-gray-200 transition"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        </>
      )}
      {renderPaginationButtons()}
      {currentPage < totalPages && (
        <>
          <button
            aria-label="Next Page"
            className="px-3 py-1 border rounded hover:bg-gray-200 transition"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
          <button
            aria-label="Last Page"
            className="px-3 py-1 border rounded hover:bg-gray-200 transition"
            onClick={() => onPageChange(totalPages)}
          >
            Last
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
