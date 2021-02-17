import Link from "next/link";

interface Pagination {
  pageName: string;
  totalCount?: number
}

const Pagination: React.FC<Pagination> = ({ pageName, totalCount }) => {
  const PER_PAGE: number = 10;

  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
  var end: number = Math.ceil(totalCount / PER_PAGE);

  return (
    <div className="bg-white px-4 py-3 flex justify-center items-center border-t border-gray-200 sm:px-6">
      <div className="sm:flex-1 sm:flex sm:items-center sm:justify-center">
        <div>
          <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
            <Link href={`/${pageName}/page/1`}>
              <a className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </a>
            </Link>
            {range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
              <Link href={`/${pageName}/page/${number}`} key={index}>
                <a className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">{number}</a>
              </Link>
            ))}
            <Link href={`/${pageName}/page/${end}`}>
              <a className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </a>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;