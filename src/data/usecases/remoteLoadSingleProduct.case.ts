import { LoadSingleProduct } from "@/domain/usecases";
import { HttpClient, HttpStatusCode } from "../protocols/http/httpClient";
import { UnexpectedError } from "@/domain/errors/unexpected.error";
import { NotFoundError } from "@/domain/errors/notFound.error";

export class RemoteLoadSingleProduct implements LoadSingleProduct {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadSingleProduct.Model>
  ) {}

  async collect(
    slug: string
  ): Promise<LoadSingleProduct.Model> {
    const { statusCode, body } = await this.httpClient.request({
      url: this.url + slug,
      method: "get",
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
