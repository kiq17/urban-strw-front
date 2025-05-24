import { ProductModel } from "@/domain/models/product.model";

export interface LoadFavoritesUserProducts {
  collect: () => Promise<LoadFavoritesUserProducts.Model[]>;
}

export namespace LoadFavoritesUserProducts {
  export type Model = {
    product: ProductModel;
    created_at: Date;
  };
}
