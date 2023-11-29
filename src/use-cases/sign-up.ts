import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositories/users-repository'
import { User } from '@prisma/client'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface signUpUseCaseRequest {
  nome: string
  email: string
  senha: string
  telefone: string[]
}

interface signUpUseCaseResponse {
  user: User
}

export class SignUpUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    nome,
    senha,
    email,
    telefone,
  }: signUpUseCaseRequest): Promise<signUpUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const senhaHash = await hash(senha, 6)

    const user = await this.usersRepository.create({
      nome,
      email,
      senha: senhaHash,
      telefone,
    })

    return { user }
  }
}
