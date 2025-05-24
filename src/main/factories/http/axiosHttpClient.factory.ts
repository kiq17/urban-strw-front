import { AxiosAdapter } from "../../../infra/http/axios.adapter";

export const makeAxiosHttpClient = (): AxiosAdapter => new AxiosAdapter()