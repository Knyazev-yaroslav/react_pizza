export type TPizzaItem = {
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

export interface IPizzaSliceState {
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
