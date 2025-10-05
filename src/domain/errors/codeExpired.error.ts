export class CodeExpiredError extends Error {
    constructor() {
      super("Código expirado");
      this.name = "CodeExpiredError";
    }
  }