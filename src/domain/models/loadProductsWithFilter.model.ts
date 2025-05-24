import { ProductModel } from "./product.model";

export interface LoadProductsWithFilterModel {
  products: ProductModel[];
  finded: number;
  count: number;
}
