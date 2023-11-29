import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { SignInUseCase } from './sign-in'
import { randomUUID } from 'crypto'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: SignInUseCase

describe('Sign-In Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new SignInUseCase(usersRepository)
  })

  it('should be able to sign in', async () => {
    await usersRepository.create({
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
      email: 'teste@teste.com',
      senha: '1234567',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to sign in with wrong e-mail', async () => {
    await usersRepository.create({
      nome: 'Gilson Ferreira',
      senha: await hash('1234567', 6),
      email: 'teste@teste.com',
      telefone: ['44998505620'],
      id: randomUUID(),
      data_criacao: new Date(),
      data_atualizacao: new Date(),
      ultimo_login: null,
    })

    await expect(() =>
      sut.execute({
        email: 'teste1@teste.com',
        senha: '1234567',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to sign in with wrong password', async () => {
    await usersRepository.create({
      nome: 'Gilson Ferreira',
      senha: await hash('1234567', 6),
      email: 'teste@teste.com',
      telefone: ['44998505620'],
      id: randomUUID(),
      data_criacao: new Date(),
      data_atualizacao: new Date(),
      ultimo_login: null,
    })

    await expect(() =>
      sut.execute({
        email: 'teste1@teste.com',
        senha: '7654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
