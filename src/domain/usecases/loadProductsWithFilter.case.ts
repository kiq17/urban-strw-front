import { LoadProductsWithFilterModel } from "../models";

export interface LoadProductsWithFilter {
  collect: (
    params: LoadProductsWithFilter.Params
  ) => Promise<LoadProductsWithFilter.Model>;
}

export type Order = "recente" | "relevante" | "maior" | "menor";

export namespace LoadProductsWithFilter {
  export type Params = {
    category?: string;
    name?: string;
    price?: string;
    order?: Order;
    page?: number;
    per_page?: number;
  };

  export type Model = LoadProductsWithFilterModel;
}
