import { HashComparer } from "@/data/protocols/crypto/hashComparer";
import { compareSync } from "bcryptjs";

export class BcryptAdapter implements HashComparer {
  compare(plaintext: string, digest: string): boolean {
    return compareSync(plaintext, digest);
  }
}
