import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { GetProfileCase } from '../get-profile'

export function MakeGetProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getProfileUseCase = new GetProfileCase(usersRepository)

  return getProfileUseCase
}
