interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }
  
  export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => {
            onPageChange(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    )
  }
  
  