import { compare } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface signInUseCaseRequest {
  email: string
  senha: string
}

interface signInUseCaseResponse {
  user: User
}

export class SignInUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    senha,
    email,
  }: signInUseCaseRequest): Promise<signInUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(senha, user.senha)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    user.ultimo_login = new Date()

    await this.usersRepository.save(user)

    return { user }
  }
}
