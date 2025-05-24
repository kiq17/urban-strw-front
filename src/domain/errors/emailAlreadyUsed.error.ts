export class EmailAlreadyUsedError extends Error {
    constructor() {
      super("O e-mail fornecido já foi cadastrado");
      this.name = "EmailAlreadyUsedError";
    }
  }
  