import { RemoteAuthentication } from "@/data/usecases";
import { Authentication } from "@/domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "@/main/factories/http";

export const makeRemoteAuthentication = (): Authentication =>
  new RemoteAuthentication(makeApiUrl("/users/login"), makeAxiosHttpClient());
