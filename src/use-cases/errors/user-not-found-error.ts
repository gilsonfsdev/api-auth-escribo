export class UserNotFoundError extends Error {
  constructor() {
    super('mensagem: Usuário não encontrado')
  }
}
