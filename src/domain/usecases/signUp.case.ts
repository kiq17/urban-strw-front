import { SignUpModel } from "../models/signUp.model";

export interface SignUp {
  create: (params: SignUp.Params) => Promise<SignUp.Model>;
}

export namespace SignUp {
  export type Params = {
    nome: string;
    email: string;
    senha: string;
    preferences: string[];
  };

  export type Model = SignUpModel;
}
