import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { randomUUID } from 'crypto'
import { hash } from 'bcryptjs'
import { GetProfileCase } from './get-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetProfileCase

describe('Get Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetProfileCase(usersRepository)
  })

  it('should be able to get a user profile', async () => {
    const newUser = await usersRepository.create({
      nome: 'Gilson Ferreira',
      senha: await hash('1234567', 6),
      email: 'teste@teste.com',
      telefone: ['44998505620'],
      id: randomUUID(),
      data_criacao: new Date(),
      data_atualizacao: new Date(),
      ultimo_login: null,
    })

    const { user } = await sut.execute({
      id: newUser.id,
    })

    expect(user?.id).toEqual(expect.any(String))
  })
})
