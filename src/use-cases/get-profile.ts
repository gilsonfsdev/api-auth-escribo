import { UsersRepository } from '../repositories/users-repository'
import { User } from '@prisma/client'
import { UserNotFoundError } from './errors/user-not-found-error'

interface getProfileCaseRequest {
  id: string
}

interface getProfileCaseResponse {
  user: User | null
}

export class GetProfileCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: getProfileCaseRequest): Promise<getProfileCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new UserNotFoundError()
    }

    return { user }
  }
}
