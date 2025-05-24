import { YupFormsAdapter } from "@/infra/validators";
import { SignUpValidator } from "@/presentation/validator/signUp.validator";
import { makeYupValidationFields } from "./yupValidationFileds.factory";

export const makeSignUpValidator = (): SignUpValidator =>
  new SignUpValidator(makeYupValidationFields(), new YupFormsAdapter());
