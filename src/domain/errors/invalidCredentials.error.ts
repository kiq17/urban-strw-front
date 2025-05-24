export class InvalidCredentialsError extends Error {
  constructor() {
    super("Email ou senha incorretos");
    this.name = "InvalidCredentialsError";
  }
}
