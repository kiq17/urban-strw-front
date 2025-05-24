import { SignUp } from "@/domain/usecases/signUp.case";

export interface SignUpFields {
  email: (email: string) => string | void;
  password: (password: string) => string | void;
  nome: (nome: string) => string | void;
}

export interface SignUpForm {
  signUp: (data: SignUp.Params) => Record<string, string> | void;
}
