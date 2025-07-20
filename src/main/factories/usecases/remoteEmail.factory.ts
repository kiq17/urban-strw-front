import { RemoteEmail } from "@/data/usecases/remoteEmail.case";
import { Email } from "@/domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

export const makeRemoteEmail = (): Email =>
  new RemoteEmail(makeApiUrl("/users/otp/"), makeAxiosHttpClient());
