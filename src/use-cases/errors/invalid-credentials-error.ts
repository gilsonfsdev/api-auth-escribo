export class InvalidCredentialsError extends Error {
  constructor() {
    super('mensagem: Usuário e/ou senha inválidos')
  }
}
