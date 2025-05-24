import { LoadFavoritesUserProducts } from "@/domain/usecases/loadFavoritesUserProducts.case";
import { HttpClient, HttpStatusCode } from "../protocols/http/httpClient";
import { LocalStorageAdapter } from "@/infra/cache/localStorage.adapter";
import { UnauthorizedError } from "@/domain/errors/unauthorized.error";
import { UnexpectedError } from "@/domain/errors/unexpected.error";

export class RemoteLoadFavoritesUserProducts
  implements LoadFavoritesUserProducts
{
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<LoadFavoritesUserProducts.Model[]>,
    private readonly storage: LocalStorageAdapter
  ) {}

  async collect(): Promise<LoadFavoritesUserProducts.Model[]> {
    const data = this.storage.get("token");

    if (!data) throw new UnauthorizedError();

    const { statusCode, body } = await this.httpClient.request({
      url: this.url,
      method: "get",
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });

    switch (statusCode) {
        case HttpStatusCode.ok:
            return body!
        case HttpStatusCode.unauthorized:
            throw new UnauthorizedError();
        default:
            throw new UnexpectedError()
    }
  }
}
