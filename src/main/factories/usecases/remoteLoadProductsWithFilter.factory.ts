import { RemoteLoadProductsWithFilter } from "@/data/usecases";
import { LoadProductsWithFilter } from "@/domain/usecases/loadProductsWithFilter.case";
import { makeApiUrl, makeAxiosHttpClient } from "@/main/factories/http";

export const makeRemoteLoadProductsWithFilter = (): LoadProductsWithFilter =>
  new RemoteLoadProductsWithFilter(
    makeApiUrl("/products/"),
    makeAxiosHttpClient()
  );
