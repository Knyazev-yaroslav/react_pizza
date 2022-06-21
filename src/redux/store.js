import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import filter from "./slices/filterSlice";

export const store = configureStore({
  reducer: {
    filter,
  },
});
