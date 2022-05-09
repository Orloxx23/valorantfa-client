import React from "react";
import "./pagination.css";

export default function Pagination({
  videosPerPage,
  totalVideos,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className="pagination p6">
        <ul>
        
          <i className="fa-solid fa-angle-left" onClick={() => paginate(currentPage-1)}></i>
          {pageNumbers.map((number) => (
            <li
              className={number === currentPage ? "is-active" : ""}
              onClick={() => paginate(number)}
              key={number}
              href="!#"
            ></li>
          ))}
          <i className="fa-solid fa-angle-right" onClick={() => paginate(currentPage+1)}></i>
        </ul>
      </div>
    </>
  );
}
