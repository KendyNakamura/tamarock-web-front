import Link from "next/link";
import { BREADCRUMBS } from "../types/Types"

const BreadCrumbs: React.FC<BREADCRUMBS> = ({ home, secondList, secondUrl, thirdList }) => {
  var first = home ? (
    <span data-testid="first-none" className="text-gray-800 px-3 rounded-md text-sm font-medium pointer-events-none">
      Home
    </span>
  ) : (
    <Link href="/">
      <a data-testid="first-link" className="text-gray-300 hover:text-white px-3 rounded-md text-sm font-medium">
        Home
      </a>
    </Link>
  );

  var second = <></>;
  if (secondList) {
    second = (
      <span data-testid="second-none" className="text-gray-800 px-3 rounded-md text-sm font-medium pointer-events-none">
        {secondList}
      </span>
    );
    if (thirdList && secondUrl) {
      second = (
        <Link href={secondUrl}>
          <a data-testid="second-link" className="text-gray-300 hover:text-white px-3 rounded-md text-sm font-medium">
            {secondList}
          </a>
        </Link>
      );
    }
  }

  var third = <></>;
  if (thirdList) {
    third = (
      <a data-testid="third-none" className="text-gray-800 px-3 rounded-md text-sm font-medium pointer-events-none" aria-current="page">
        {thirdList.slice(0, 20)}
      </a>
    );
  }
  return (
    <div className="hidden md:block sm:px-8 bg-gray-500 font-mono">
      <div className="flex items-center justify-between h-8">
        <div className="ml-10 flex items-baseline space-x-4">
          {first}
          {secondList ? (
            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
            </svg>
          ) : (
            ""
          )}
          {second}
          {thirdList ? (
            <svg className="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
            </svg>
          ) : (
            ""
          )}
          {third}
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbs;
