import { ProductModel } from "./product.model";

export interface LoadProductsModel {
  products: ProductModel[];
  count: number;
}
