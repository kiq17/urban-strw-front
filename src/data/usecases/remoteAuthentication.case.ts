import { InvalidCredentialsError } from "../../domain/errors/invalidCredentials.error";
import { UnexpectedError } from "../../domain/errors/unexpected.error";
import { AccountModel } from "../../domain/models/account.model";
import { Authentication } from "../../domain/usecases/authentication.case";
import { HttpClient, HttpStatusCode } from "../protocols/http/httpClient";

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<AccountModel>
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    const { statusCode, body } = await this.httpClient.request({
      method: "post",
      url: this.url,
      body: params,
    });
    console.log("body", body)
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
