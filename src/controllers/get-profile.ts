import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeGetProfileUseCase } from '../use-cases/factories/make-get-user-profile-use-case'
import { format } from 'date-fns'

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const getUserProfileUseCase = MakeGetProfileUseCase()

  const { user } = await getUserProfileUseCase.execute({
    id: request.user.sign.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      data_criacao: user?.data_criacao
        ? format(new Date(user.data_criacao), 'dd/MM/yyyy HH:mm:ss')
        : null,
      data_atualizacao: user?.data_atualizacao
        ? format(new Date(user?.data_atualizacao), 'dd/MM/yyyy HH:mm:ss')
        : null,
      ultimo_login: user?.ultimo_login
        ? format(new Date(user?.ultimo_login), 'dd/MM/yyyy HH:mm:ss')
        : null,
    },
  })
}
