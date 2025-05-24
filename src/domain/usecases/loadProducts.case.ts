import { LoadProductsModel } from "../models";

export interface LoadProducts {
  collect: (params: LoadProducts.Params) => Promise<LoadProducts.Model>;
}

export namespace LoadProducts {
  export type Params = {
    page: number;
    per_page: number;
  };

  export type Model = LoadProductsModel;
}
