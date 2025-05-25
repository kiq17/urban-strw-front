import { RemoteLoadSingleProduct } from "@/data/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";


export const makeRemoteLoadSingleProduct = (): RemoteLoadSingleProduct => new RemoteLoadSingleProduct(
     makeApiUrl("/products/"),
     makeAxiosHttpClient()
)