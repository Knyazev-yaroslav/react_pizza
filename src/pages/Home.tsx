import React, { FC, useEffect, useRef } from "react";
import { useSelector } from "react-redux/es/exports";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Sort, { sortList } from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useAppDispatch } from "../redux/store";

import {
  IFilterSliceState,
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import {
  fetchPizzas,
  selectPizzaData,
  TSearchPizzaParams,
} from "../redux/slices/pizzaSlice";

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const isSearch = useRef(false);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1) as unknown as TSearchPizzaParams
  //     );
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         //@ts-ignore
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       })
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });

  //     navigate(`/?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(index: number) => onChangeCategory(index)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>
            К сожалению, не удалось получить питсыю попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

// .filter((obj) => {
//   if (obj.title.toLowerCase().include(searchValue.toLowerCase())) {
//     return true;
//   }

//   return false;
// })

export default Home;
