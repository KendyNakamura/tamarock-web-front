import React from "react";
import ReactPaginate from "react-paginate";
import Router, { useRouter } from "next/router";

export default function Pagenation({ list, count }) {
  const router = useRouter();

  const pagginationHandler = (page) => {
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    if (!isNaN(page.selected)) {
      console.log(page.selected);
      currentQuery.page = page.selected + 1;
    }

    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      initialPage={list.currentPage - 1}
      pageCount={count / 10} //page count
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={pagginationHandler}
      containerClassName={"paginate-wrap"}
      subContainerClassName={"paginate-inner"}
      pageClassName={"paginate-li"}
      pageLinkClassName={"paginate-a"}
      activeClassName={"paginate-active"}
      nextLinkClassName={"paginate-next-a"}
      previousLinkClassName={"paginate-prev-a"}
      breakLinkClassName={"paginate-break-a"}
    />
  );
}
