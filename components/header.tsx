import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const [query, setQuery] = useState("");
  const [check, setCheck] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function falseCheck() {
    setCheck("");
  }

  // function handleCheck() {
  //   if (check == "checked") {
  //     setCheck("");
  //   } else {
  //     setCheck("checked");
  //   }
  // }

  var href = {
    pathname: query ? "/search" : "/",
    query: query ? { name: encodeURI(query) } : "",
  };

  function handleKeyPress(e) {
    if (e.key == "Enter") {
      e.preventDefault();
      router.push(href);
    }
  }

  return (
    <>
      <nav className="bg-gray-800 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <a className="text-gray-300 px-3 py-2 rounded-md text-lg font-bold hover:no-underline">
                    たまロック
                    {/* <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" /> */}
                  </a>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/articles/page/1">
                    <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">記事一覧</a>
                  </Link>
                  <Link href="/artists/page/1">
                    <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">アーティスト一覧</a>
                  </Link>
                  <Link href="/about">
                    <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">about</a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden md:flex border-grey-light">
              <input onChange={(e) => setQuery(e.target.value)} value={query} onKeyPress={(e) => handleKeyPress(e)} className="w-full ml-1 outline-none px-2" type="text" placeholder="Search..." />
              <Link href={href}>
                <a onClick={falseCheck} className="bg-gray-300">
                  <span className="w-auto flex justify-end outline-none items-center text-black hover:text-gray-500 p-2">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </a>
              </Link>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <svg className={`${isOpen ? "hidden" : "block"} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className={`${isOpen ? "block" : "hidden"} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="flex border-grey-light">
              <input onChange={(e) => setQuery(e.target.value)} value={query} onKeyPress={(e) => handleKeyPress(e)} className="w-full ml-1 outline-none px-2" type="text" placeholder="Search..." />
              <Link href={href}>
                <a onClick={falseCheck} className="bg-gray-300">
                  <span className="w-auto flex justify-end outline-none items-center text-black hover:text-gray-500 p-2">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </a>
              </Link>
            </div>
            <Link href="/articles/page/1">
              <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">記事一覧</a>
            </Link>
            <Link href="/artists/page/1">
              <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">アーティスト一覧</a>
            </Link>
            <Link href="/about">
              <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">about</a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;