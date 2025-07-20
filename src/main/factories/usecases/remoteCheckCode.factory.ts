import { RemoteCheckCode } from "@/data/usecases";
import { CheckCode } from "@/domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

export const makeRemoteCheckCode = (): CheckCode =>
  new RemoteCheckCode(makeApiUrl("/users/check/"), makeAxiosHttpClient());
