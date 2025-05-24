import { RemoteSignUp } from "@/data/usecases/remoteSignUp.case";
import { SignUp } from "@/domain/usecases/signUp.case";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

export const makeRemoteSignUp = (): SignUp =>
  new RemoteSignUp(makeApiUrl("/users/"), makeAxiosHttpClient());
