import { Email } from "@/domain/usecases";
import { HttpClient, HttpStatusCode } from "../protocols/http/httpClient";
import { InvalidCredentialsError } from "@/domain/errors/invalidCredentials.error";
import { UnexpectedError } from "@/domain/errors/unexpected.error";

export class RemoteEmail implements Email {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<Email.Result>
  ) {}

  async send(params: Email.Params): Promise<Email.Result> {
    const {statusCode, body} = await this.httpClient.request({
      method: "post",
      url: this.url,
      params,
    });

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body!;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnexpectedError();
    }
  }
}
