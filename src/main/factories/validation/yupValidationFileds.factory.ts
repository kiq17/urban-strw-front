import { YupFiledsAdapter } from "@/infra/validators";
import { CpfValidator } from "@/main/utils/cpfValidation";

export const makeYupValidationFields = (): YupFiledsAdapter =>
  new YupFiledsAdapter(new CpfValidator());
