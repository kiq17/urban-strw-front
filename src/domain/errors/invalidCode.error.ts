export class InvalidCodeError extends Error {
    constructor() {
      super("Código inválido");
      this.name = "InvalidCodeError";
    }
  }