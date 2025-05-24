import { SignUpModel } from "@/domain/models/signUp.model";
import { SignUp } from "@/domain/usecases/signUp.case";
import { HttpClient, HttpStatusCode } from "../protocols/http/httpClient";
import { UnauthorizedError } from "@/domain/errors/unauthorized.error";
import { UnexpectedError } from "@/domain/errors/unexpected.error";
import { EmailAlreadyUsedError } from "@/domain/errors/emailAlreadyUsed.error";

export class RemoteSignUp implements SignUp {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<SignUpModel>
  ) {}

  async create(params: SignUp.Params): Promise<SignUp.Model> {
    const { statusCode, body } = await this.httpClient.request({
      method: "post",
      url: this.url,
      body: params,
    });

    switch (statusCode) {
      case HttpStatusCode.created:
        return body!;
      case HttpStatusCode.unauthorized:
        throw new UnauthorizedError();
      case HttpStatusCode.badRequest:
        throw new EmailAlreadyUsedError();
      default:
        throw new UnexpectedError();
    }
  }
}
