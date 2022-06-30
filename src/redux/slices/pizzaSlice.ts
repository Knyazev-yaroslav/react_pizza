import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { TCartItem } from "./cartSlice";
import { TSort } from "./filterSlice";

type TPizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface IPizzaSliceState {
  items: TPizzaItem[];
  status: Status;
}

export type TSearchPizzaParams = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: string;
};

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

const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TPizzaItem[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.items = [];
  //     state.status = "loading";
  //   },

  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = "success";
  //   },

  //   [fetchPizzas.rejected]: (state) => {
  //     state.items = [];
  //     state.status = "error";
  //   },
  // },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
