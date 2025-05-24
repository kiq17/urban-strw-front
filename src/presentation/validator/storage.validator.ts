import { GetStorage } from "@/data/protocols/cache/getStorage";
import { HashComparer } from "@/data/protocols/crypto/hashComparer";
import { Storage } from "@/data/protocols/validation";

export class StorageValidator implements Storage {
  constructor(
    private readonly local: GetStorage,
    private readonly crypto: HashComparer
  ) {}

  check(value: string): boolean {
    const valueInCache = this.local.get(value);
    if (!valueInCache || Object.keys(value).length == 0) return false;
    return this.crypto.compare(valueInCache["user"], valueInCache["hash"]);
  }
}
