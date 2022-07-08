import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TPizzaItem, TSearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk<TPizzaItem[], TSearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<TPizzaItem[]>(
      `https://62af2c613bbf46a3521d76a8.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);
