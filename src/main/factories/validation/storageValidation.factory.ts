import { BcryptAdapter } from "@/infra/crypto/bcrypt.adapter";
import { StorageValidator } from "@/presentation/validator/storage.validator";
import { makeLocalStorageAdapter } from "../cache/localStorage.factory";

export const makeStorageValidator = (): StorageValidator =>
  new StorageValidator(makeLocalStorageAdapter(), new BcryptAdapter());
