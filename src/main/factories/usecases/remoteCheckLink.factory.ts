import { RemoteCheckLink } from "@/data/usecases";
import { CheckLink } from "@/domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

export const makeRemoteCheckLink = (): CheckLink =>
  new RemoteCheckLink(makeApiUrl("/users/link/"), makeAxiosHttpClient());
