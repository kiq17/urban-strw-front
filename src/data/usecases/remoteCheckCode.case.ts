import { CodeExpiredError, InvalidCodeError } from "@/domain/errors";
import { UnexpectedError } from "@/domain/errors/unexpected.error";
import { CheckCode } from "@/domain/usecases";
import { HttpClient, HttpStatusCode } from "../protocols/http/httpClient";

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
      case HttpStatusCode.badRequest:
        throw new CodeExpiredError();
      case HttpStatusCode.notFound:
        throw new InvalidCodeError();
      default:
        throw new UnexpectedError();
    }
  }
}
