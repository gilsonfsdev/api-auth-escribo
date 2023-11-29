import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { SignInUseCase } from '../sign-in'

export function MakeSignInUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const signInUseCase = new SignInUseCase(usersRepository)

  return signInUseCase
}
