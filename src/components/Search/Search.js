import React, { useContext } from "react";
import style from "./Search.module.scss";
import search_svg from "../../assets/img/search.svg";
import { SearchContext } from "../../App";

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  return (
    <div className={style.search}>
      <img className={style.icon} src={search_svg} alt="search svg" />
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={style.input}
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <svg
          onClick={() => setSearchValue("")}
          className={style.close}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};

export default Search;