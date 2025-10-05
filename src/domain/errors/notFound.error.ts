export class NotFoundError extends Error {
    constructor() {
      super("Informação não encontrada");
      this.name = "NotFoundError";
    }
  }