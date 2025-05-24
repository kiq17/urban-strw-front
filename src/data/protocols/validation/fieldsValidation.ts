export interface FiledsValidation {
  email: (email: string) => string | void;
  password: (password: string) => string | void;
  nome: (nome: string) => string | void;
  cpf: (cpf: string) => string | void;
  fullName: (fullName: string) => string | void;
  street: (street: string) => string | void;
  city: (city: string) => string | void;
  state: (state: string) => string | void;
  neighborhood: (neighborhood: string) => string | void;
  houseNumber: (houseNumber: number) => string | void;
  houseType: (houseType: string) => string | void;
  cep: (cep: string) => string | void;
}

export interface CpfValidation {
  validate: (cpf: string) => string | void;
}
