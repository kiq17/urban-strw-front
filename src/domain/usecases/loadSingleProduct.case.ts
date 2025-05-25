import { ProductModel } from "../models";

export interface LoadSingleProduct {
  collect: (slug: string) => Promise<LoadSingleProduct.Model>;
}

export namespace LoadSingleProduct {
  export type Model = ProductModel;
}
