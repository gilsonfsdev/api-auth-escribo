import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeGetProfileUseCase } from '../use-cases/factories/make-get-user-profile-use-case'

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const getUserProfileUseCase = MakeGetProfileUseCase()

  const { user } = await getUserProfileUseCase.execute({
    id: request.user.sign.sub,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
