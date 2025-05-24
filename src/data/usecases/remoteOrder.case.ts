import { NotFoundError } from "@/domain/errors/notFound.error";
import { UnauthorizedError } from "@/domain/errors/unauthorized.error";
import { UnexpectedError } from "@/domain/errors/unexpected.error";
import { Order } from "@/domain/usecases/order.case";
import { LocalStorageAdapter } from "@/infra/cache/localStorage.adapter";
import { HttpClient, HttpStatusCode } from "../protocols/http/httpClient";

export class RemoteOrder implements Order {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<boolean>,
    private readonly storage: LocalStorageAdapter
  ) {}

  async buy(data: Order.Params): Promise<boolean> {
    const storage = this.storage.get("token");
    const { statusCode, body } = await this.httpClient.request({
      url: this.url,
      method: "post",
      headers: {
        Authorization: `Bearer ${storage.token}`,
      },
      params: data.productId,
    });

    switch (statusCode) {
        case HttpStatusCode.created:
          return body!;
        case HttpStatusCode.unauthorized:
          throw new UnauthorizedError();
        case HttpStatusCode.badRequest:
          throw new NotFoundError()
        default:
          throw new UnexpectedError();
      }
  }
}
