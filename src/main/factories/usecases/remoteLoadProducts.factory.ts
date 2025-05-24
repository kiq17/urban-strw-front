import { RemoteLoadProducts } from "@/data/usecases/remoteLoadProducts";
import { LoadProducts } from "@/domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "@/main/factories/http";

export const makeRemoteLoadProducts = (): LoadProducts =>
  new RemoteLoadProducts(makeApiUrl("/products/list/"), makeAxiosHttpClient());
