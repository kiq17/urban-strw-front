import { RemoteLoadFavoritesUserProducts } from "@/data/usecases/remoteLoadFavoritesUserProducts.case";
import { LoadFavoritesUserProducts } from "@/domain/usecases/loadFavoritesUserProducts.case";
import { makeAxiosHttpClient, makeApiUrl } from "../http";
import { makeLocalStorageAdapter } from "../cache/localStorage.factory";

export const makeRemoteLoadFavoritesUserProducts =
  (): LoadFavoritesUserProducts =>
    new RemoteLoadFavoritesUserProducts(
      makeApiUrl("/favorites/"),
      makeAxiosHttpClient(),
      makeLocalStorageAdapter()
    );
