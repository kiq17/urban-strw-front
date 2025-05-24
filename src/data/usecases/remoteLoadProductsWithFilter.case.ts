import { LoadProductsWithFilter } from "@/domain/usecases/loadProductsWithFilter.case";
import { HttpClient, HttpStatusCode } from "../protocols/http/httpClient";
import { NotFoundError } from "@/domain/errors/notFound.error";
import { UnexpectedError } from "@/domain/errors/unexpected.error";

export class RemoteLoadProductsWithFilter implements LoadProductsWithFilter {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadProductsWithFilter.Model>
  ) {}

  async collect(
    params: LoadProductsWithFilter.Params
  ): Promise<LoadProductsWithFilter.Model> {
    const { statusCode, body } = await this.httpClient.request({
      url: this.url,
      method: "get",
      params,
    });

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
