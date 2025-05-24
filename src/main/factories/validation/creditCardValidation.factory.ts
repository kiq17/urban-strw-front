import { YupFormsAdapter } from "@/infra/validators";
import { CreditCardValidator } from "@/presentation/validator/creditCard.validator";
import { makeYupValidationFields } from "./yupValidationFileds.factory";

export const makeCreditCardValidator = (): CreditCardValidator =>
  new CreditCardValidator(makeYupValidationFields(), new YupFormsAdapter());
