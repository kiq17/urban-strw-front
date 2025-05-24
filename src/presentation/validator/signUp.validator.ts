import {
  SignUpFields,
  SignUpForm,
} from "@/data/protocols/validation/signUp.validation";
import { SignUp } from "@/domain/usecases/signUp.case";

export class SignUpValidator implements SignUpFields, SignUpForm {
  constructor(
    private readonly validatorField: SignUpFields,
    private readonly validatorForm: SignUpForm
  ) {}

  email(email: string): string | void {
    return this.validatorField.email(email);
  }
  nome(nome: string): string | void {
    return this.validatorField.nome(nome);
  }
  password(password: string): string | void {
    return this.validatorField.password(password);
  }
  signUp(data: SignUp.Params): void | Record<string, string> {
    return this.validatorForm.signUp(data);
  }
}
