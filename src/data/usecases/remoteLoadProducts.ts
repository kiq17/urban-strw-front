import { LoadProducts } from "@/domain/usecases/loadProducts.case";
import { HttpClient, HttpStatusCode } from "../protocols/http/httpClient";
import { NotFoundError } from "@/domain/errors/notFound.error";
import { UnexpectedError } from "@/domain/errors/unexpected.error";

export class RemoteLoadProducts implements LoadProducts {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadProducts.Model>
  ) {}

  async collect(params: LoadProducts.Params): Promise<LoadProducts.Model> {
    const { body, statusCode } = await this.httpClient.request({
      url: this.url,
      method: "get",
      params
    });
    console.log("body",body)

    switch (statusCode) {
      case HttpStatusCode.ok:
        return body!;
      case HttpStatusCode.badRequest:
        throw new NotFoundError();
      default:
        throw new UnexpectedError();
    }
  }
}
