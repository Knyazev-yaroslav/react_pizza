import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import style from "./Search.module.scss";
import search_svg from "../../assets/img/search.svg";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux/es/exports";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const uppdateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 500),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    uppdateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current?.focus();
  };

  // const onChangeInput = (event) => setSearchValue(event.target.value);

  return (
    <div className={style.search}>
      <img className={style.icon} src={search_svg} alt="search svg" />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={style.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={onClickClear}
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
