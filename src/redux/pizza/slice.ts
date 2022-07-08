import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPizzas } from "./asyncActions";
import { IPizzaSliceState, Status, TPizzaItem } from "./types";

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

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
