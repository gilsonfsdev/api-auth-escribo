import { beforeEach, describe, expect, it } from 'vitest'
import { SignUpUseCase } from './sign-up'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: SignUpUseCase

describe('Sign-Up Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new SignUpUseCase(usersRepository)
  })

  it('should be able to sign up', async () => {
    const { user } = await sut.execute({
      nome: 'Gilson Ferreira',
      senha: '1234567',
      email: 'teste@teste.com',
      telefone: ['44998505620'],
    })

    expect(user.id).toEqual(expect.any(String))
    expect(usersRepository.items[0]).toEqual(
      expect.objectContaining({
        email: 'teste@teste.com',
      }),
    )
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      nome: 'Gilson Ferreira',
      senha: '1234567',
      email: 'teste@teste.com',
      telefone: ['44998505620'],
    })

    await expect(() =>
      sut.execute({
        nome: 'Gilson Ferreira',
        senha: '1234567',
        email: 'teste@teste.com',
        telefone: ['44998505620'],
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
