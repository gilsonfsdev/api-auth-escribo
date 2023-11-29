import { User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: User) {
    const user = {
      id: randomUUID(),
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      telefone: data.telefone,
      data_criacao: new Date(),
      data_atualizacao: new Date(),
      ultimo_login: null,
    }

    this.items.push(user)

    return user
  }

  async save(user: User) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items[itemIndex] = user

    return this.items[itemIndex]
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
