import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { SignUpUseCase } from '../sign-up'

export function MakeSignUpUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const signUpUseCase = new SignUpUseCase(usersRepository)

  return signUpUseCase
}
