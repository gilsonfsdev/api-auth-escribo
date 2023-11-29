import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeSignUpUseCase } from '../use-cases/factories/make-sign-up-use-case'
import { UserAlreadyExistsError } from '../use-cases/errors/user-already-exists-error'
import { format } from 'date-fns'

export async function signUp(request: FastifyRequest, reply: FastifyReply) {
  const signupBodySchema = z.object({
    nome: z.string().min(1, 'O nome deve ser preenchido'),
    email: z.string().email().min(1, 'O e-mail deve ser preenchido'),
    senha: z.string().min(6),
    telefone: z.array(z.string()),
  })

  const { nome, email, senha, telefone } = signupBodySchema.parse(request.body)

  try {
    const signUpUseCase = MakeSignUpUseCase()

    const { user } = await signUpUseCase.execute({
      nome,
      email,
      senha,
      telefone,
    })

    return reply.status(201).send({
      id: user.id,
      data_criacao: user.data_criacao
        ? format(new Date(user.data_criacao), 'dd/MM/yyyy HH:mm:ss')
        : null,
      data_atualizacao: user.data_atualizacao
        ? format(new Date(user.data_atualizacao), 'dd/MM/yyyy HH:mm:ss')
        : null,
      ultimo_login: user.ultimo_login,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
