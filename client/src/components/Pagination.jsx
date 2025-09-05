import React from "react";

const Pagination = ({ page, pages, onChange }) => {
  if (pages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-3 mt-6 text-sm sm:text-base">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 sm:px-4 sm:py-2 bg-indigo-500 text-white rounded-md disabled:opacity-50 hover:bg-indigo-600 transition text-xs sm:text-sm"
      >
        Prev
      </button>

      <span className="text-gray-700 font-medium text-xs sm:text-sm">
        Page {page} of {pages}
      </span>

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === pages}
        className="px-3 py-1 sm:px-4 sm:py-2 bg-indigo-500 text-white rounded-md disabled:opacity-50 hover:bg-indigo-600 transition text-xs sm:text-sm"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
