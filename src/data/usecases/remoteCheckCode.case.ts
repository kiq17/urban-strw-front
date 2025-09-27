import { CheckCode } from "@/domain/usecases";
import { HttpClient, HttpStatusCode } from "../protocols/http/httpClient";
import { InvalidCredentialsError } from "@/domain/errors/invalidCredentials.error";
import { UnexpectedError } from "@/domain/errors/unexpected.error";

export class RemoteCheckCode implements CheckCode {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient
  ) {}

  async check(params: CheckCode.Params): Promise<CheckCode.Result> {
    const { statusCode, body } = await this.httpClient.request({
      method: "get",
      url: this.url + params,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return Boolean(body!);
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
